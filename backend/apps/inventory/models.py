from django.db import models
from django.utils.translation import gettext_lazy as _
from apps.users.models import Branch

class Product(models.Model):
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    base_unit_name = models.CharField(max_length=50, default='Piece', help_text=_("The smallest unit, e.g., 'Piece'"))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Product')
        verbose_name_plural = _('Products')

    def __str__(self):
        return self.name

class ProductDerivative(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='derivatives')
    derivative_name = models.CharField(max_length=50, help_text=_("e.g., 'Carton' or 'Box'"))
    conversion_rate = models.PositiveIntegerField(help_text=_("How many base units are in this derivative (e.g., 36 pieces in 1 carton)"))

    class Meta:
        verbose_name = _('Product Derivative')
        verbose_name_plural = _('Product Derivatives')

    def __str__(self):
        return f"{self.derivative_name} of {self.product.name} ({self.conversion_rate} {self.product.base_unit_name}s)"

class InventoryBatch(models.Model):
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='inventory_batches')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='batches')
    batch_number = models.CharField(max_length=100, blank=True)
    base_unit_stock_level = models.IntegerField(default=0, help_text=_("Stock level stored in the smallest unit (base units)"))
    retail_price_per_base_unit = models.DecimalField(max_digits=10, decimal_places=2)
    wholesale_price_per_base_unit = models.DecimalField(max_digits=10, decimal_places=2)
    expiry_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Inventory Batch')
        verbose_name_plural = _('Inventory Batches')

    def __str__(self):
        return f"{self.product.name} at {self.branch.name} (Batch: {self.batch_number})"
