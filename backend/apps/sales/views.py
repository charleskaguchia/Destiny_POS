from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction, models
from .models import SaleTransaction, SaleLineItem
from .serializers import CheckoutSerializer
from apps.inventory.models import InventoryBatch

class CheckoutView(APIView):
    """
    Handles sales checkout with FIFO inventory deduction.
    """
    def post(self, request, *args, **kwargs):
        serializer = CheckoutSerializer(data=request.data)
        if serializer.is_valid():
            try:
                with transaction.atomic():
                    # Extract validated data
                    validated_data = serializer.validated_data
                    items_data = validated_data.pop('items')
                    branch = validated_data.get('branch')
                    
                    # Create SaleTransaction
                    # Note: request.user might be AnonymousUser if not logged in
                    cashier = request.user if request.user.is_authenticated else None
                    sale = SaleTransaction.objects.create(
                        cashier=cashier,
                        **validated_data
                    )
                    
                    for item_data in items_data:
                        product = item_data['product']
                        qty_to_reduce = item_data['quantity_sold']
                        
                        # 1. Check total stock across all batches in this branch
                        total_stock = InventoryBatch.objects.filter(
                            branch=branch, product=product
                        ).aggregate(total=models.Sum('base_unit_stock_level'))['total'] or 0
                        
                        if total_stock < qty_to_reduce:
                            # Raising an exception inside transaction.atomic() triggers rollback
                            raise ValueError(f"Insufficient stock for {product.name}. Required: {qty_to_reduce}, Available: {total_stock}")
                        
                        # 2. FIFO Deduction: Order by expiry_date (nulls last) or created_at
                        # Django handles nulls last by default in some DBs, or we can use F().nulls_last()
                        # For simplicity, we order by expiry_date then created_at.
                        batches = InventoryBatch.objects.filter(
                            branch=branch, product=product, base_unit_stock_level__gt=0
                        ).order_by('expiry_date', 'created_at')
                        
                        remaining_qty = qty_to_reduce
                        for batch in batches:
                            if remaining_qty <= 0:
                                break
                            
                            if batch.base_unit_stock_level >= remaining_qty:
                                batch.base_unit_stock_level -= remaining_qty
                                batch.save()
                                remaining_qty = 0
                            else:
                                remaining_qty -= batch.base_unit_stock_level
                                batch.base_unit_stock_level = 0
                                batch.save()
                        
                        # 3. Create SaleLineItem
                        SaleLineItem.objects.create(transaction=sale, **item_data)
                    
                    # Return the serialized sale data (you might want a different response serializer here)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
            except ValueError as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({"error": "An unexpected error occurred during checkout."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
