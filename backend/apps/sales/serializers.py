from rest_framework import serializers
from .models import SaleTransaction, SaleLineItem
from apps.inventory.models import Product

class SaleLineItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaleLineItem
        fields = ['product', 'quantity_sold', 'unit_price_applied', 'subtotal']

class CheckoutSerializer(serializers.ModelSerializer):
    items = SaleLineItemSerializer(many=True)

    class Meta:
        model = SaleTransaction
        fields = [
            'branch', 'customer', 'sale_type', 'payment_method', 
            'total_amount', 'local_timestamp', 'items'
        ]

    def validate_items(self, value):
        if not value:
            raise serializers.ValidationError("At least one item is required.")
        return value
