from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from apps.users.models import Branch
from apps.inventory.models import Product
from apps.debt.models import Customer

class SaleTransaction(models.Model):
    class SaleType(models.TextChoices):
        RETAIL = 'RETAIL', _('Retail')
        WHOLESALE = 'WHOLESALE', _('Wholesale')

    class PaymentMethod(models.TextChoices):
        CASH = 'CASH', _('Cash')
        MPESA = 'MPESA', _('M-Pesa')
        MKOPO = 'MKOPO', _('Mkopo (Debt)')

    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='sales')
    cashier = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='sales_handled')
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True, related_name='purchases')
    
    sale_type = models.CharField(max_length=15, choices=SaleType.choices, default=SaleType.RETAIL)
    payment_method = models.CharField(max_length=10, choices=PaymentMethod.choices, default=PaymentMethod.CASH)
    
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    
    local_timestamp = models.DateTimeField(help_text=_("The timestamp from the PWA device when sale occurred."))
    server_timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Sale Transaction')
        verbose_name_plural = _('Sale Transactions')

    def __str__(self):
        return f"Sale {self.id} - {self.total_amount} ({self.branch.name})"

class SaleLineItem(models.Model):
    transaction = models.ForeignKey(SaleTransaction, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name='sales_entries')
    quantity_sold = models.IntegerField(help_text=_("In base units"))
    unit_price_applied = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2)

    class Meta:
        verbose_name = _('Sale Line Item')
        verbose_name_plural = _('Sale Line Items')

    def __str__(self):
        return f"{self.product.name} x {self.quantity_sold}"
