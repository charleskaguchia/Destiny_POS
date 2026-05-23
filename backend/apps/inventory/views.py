from rest_framework import viewsets, permissions
from .models import Product, ProductDerivative, InventoryBatch
from .serializers import ProductSerializer, ProductDerivativeSerializer, InventoryBatchSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().prefetch_related('derivatives')
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    filterset_fields = ['category']
    search_fields = ['name', 'category']

class ProductDerivativeViewSet(viewsets.ModelViewSet):
    queryset = ProductDerivative.objects.all()
    serializer_class = ProductDerivativeSerializer
    permission_classes = [permissions.AllowAny]

class InventoryBatchViewSet(viewsets.ModelViewSet):
    queryset = InventoryBatch.objects.all().select_related('product', 'branch')
    serializer_class = InventoryBatchSerializer
    permission_classes = [permissions.AllowAny]
    filterset_fields = ['branch', 'product', 'expiry_date']
    search_fields = ['product__name', 'batch_number']
