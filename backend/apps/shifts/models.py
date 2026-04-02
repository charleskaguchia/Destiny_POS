from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from apps.users.models import Branch

class Shift(models.Model):
    class Status(models.TextChoices):
        OPEN = 'OPEN', _('Open')
        CLOSED = 'CLOSED', _('Closed')

    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='shifts')
    cashier = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='shifts')
    
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
    
    starting_cash = models.DecimalField(max_digits=12, decimal_places=2)
    declared_ending_cash = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.OPEN)

    class Meta:
        verbose_name = _('Shift')
        verbose_name_plural = _('Shifts')

    def __str__(self):
        return f"Shift {self.id} - {self.cashier.username} ({self.status})"

class DailyExpense(models.Model):
    shift = models.ForeignKey(Shift, on_delete=models.CASCADE, related_name='expenses')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    description = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Daily Expense')
        verbose_name_plural = _('Daily Expenses')

    def __str__(self):
        return f"Expense {self.id} - {self.amount}"
