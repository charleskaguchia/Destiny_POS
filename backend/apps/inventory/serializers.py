from rest_framework import serializers
from .models import Product, ProductDerivative, InventoryBatch

class ProductDerivativeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDerivative
        fields = ['id', 'product', 'derivative_name', 'conversion_rate']

class InventoryBatchSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    branch_name = serializers.ReadOnlyField(source='branch.name')

    class Meta:
        model = InventoryBatch
        fields = [
            'id', 'branch', 'branch_name', 'product', 'product_name', 
            'batch_number', 'base_unit_stock_level', 
            'retail_price_per_base_unit', 'wholesale_price_per_base_unit', 
            'expiry_date', 'created_at'
        ]

class ProductSerializer(serializers.ModelSerializer):
    derivatives = ProductDerivativeSerializer(many=True, read_only=True)
    stock = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()
    unit = serializers.ReadOnlyField(source='base_unit_name')
    status = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'category', 'unit', 'stock', 'price', 'status', 'derivatives', 'created_at', 'updated_at']

    def get_stock(self, obj):
        # Sum up stock from all batches for this product
        return sum(batch.base_unit_stock_level for batch in obj.batches.all())

    def get_price(self, obj):
        # Get the price from the latest batch
        latest_batch = obj.batches.order_by('-created_at').first()
        return latest_batch.retail_price_per_base_unit if latest_batch else 0

    def get_status(self, obj):
        stock = self.get_stock(obj)
        if stock <= 0: return 'Out of Stock'
        if stock < 20: return 'Low Stock'
        return 'In Stock'
