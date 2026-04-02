from django.contrib import admin
from .models import Product, ProductDerivative, InventoryBatch

class ProductDerivativeInline(admin.TabularInline):
    model = ProductDerivative
    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'base_unit_name')
    search_fields = ('name', 'category')
    inlines = [ProductDerivativeInline]

@admin.register(InventoryBatch)
class InventoryBatchAdmin(admin.ModelAdmin):
    list_display = ('product', 'branch', 'batch_number', 'base_unit_stock_level', 'retail_price_per_base_unit', 'expiry_date')
    list_filter = ('branch', 'product__category', 'expiry_date')
    search_fields = ('product__name', 'batch_number')
