from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.sales.models import SaleLineItem
from .models import InventoryBatch

@receiver(post_save, sender=SaleLineItem)
def deduct_stock_on_sale(sender, instance, created, **kwargs):
    if created:
        # For simplicity, we deduct from the first available batch at the transaction's branch
        # In a real scenario, you might want to specify the batch or follow FIFO
        batch = InventoryBatch.objects.filter(
            product=instance.product,
            branch=instance.transaction.branch
        ).first()
        
        if batch:
            batch.base_unit_stock_level -= instance.quantity_sold
            batch.save()
