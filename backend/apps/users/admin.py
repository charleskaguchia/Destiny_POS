from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Branch

@admin.register(Branch)
class BranchAdmin(admin.ModelAdmin):
    list_display = ('name', 'location')
    search_fields = ('name', 'location')

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'role', 'branch', 'is_staff')
    list_filter = ('role', 'branch', 'is_staff', 'is_superuser')
    fieldsets = UserAdmin.fieldsets + (
        ('Profile', {'fields': ('role', 'branch', 'phone_number')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Profile', {'fields': ('role', 'branch', 'phone_number')}),
    )
