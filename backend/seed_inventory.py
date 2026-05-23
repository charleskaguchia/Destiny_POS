import os
import django
import sys

# Set up Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from apps.users.models import Branch
from apps.inventory.models import Product, InventoryBatch
from decimal import Decimal
from django.utils import timezone

def seed_data():
    print("Seeding database...")
    
    # 1. Create a Branch
    branch, _ = Branch.objects.get_or_create(
        name="Nairobi Central",
        defaults={"location": "Nairobi CBD"}
    )
    print(f"Branch created: {branch}")

    # 2. Sample Products Data
    products_data = [
        {"name": "Lifebuoy Soap 150g", "category": "Personal Care", "unit": "Pieces", "stock": 150, "price": 120},
        {"name": "Jogoo Maize Meal 2kg", "category": "FMCG", "unit": "Bales", "stock": 45, "price": 2150},
        {"name": "Panadol Extra", "category": "OTC Drugs", "unit": "Tablets", "stock": 800, "price": 15},
        {"name": "Blue Band 500g", "category": "FMCG", "unit": "Pieces", "stock": 10, "price": 340},
        {"name": "Coca Cola 500ml", "category": "Beverages", "unit": "Pieces", "stock": 120, "price": 70},
    ]

    for p in products_data:
        product, created = Product.objects.get_or_create(
            name=p["name"],
            defaults={
                "category": p["category"],
                "base_unit_name": p["unit"]
            }
        )
        
        # Create a batch for each product to provide stock and price
        InventoryBatch.objects.get_or_create(
            product=product,
            branch=branch,
            batch_number=f"BATCH-{timezone.now().strftime('%Y%m%d%H%M')}",
            defaults={
                "base_unit_stock_level": p["stock"],
                "retail_price_per_base_unit": Decimal(str(p["price"])),
                "wholesale_price_per_base_unit": Decimal(str(p["price"] * 0.9)),
                "expiry_date": timezone.now().date() + timezone.timedelta(days=365)
            }
        )
        print(f"Product and Batch created: {product.name}")

    print("Seeding completed successfully!")

if __name__ == "__main__":
    seed_data()
