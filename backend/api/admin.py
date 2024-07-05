from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'description', 'image', 'created_at')
    # Ensure that there are no extra characters or incorrect field names
    list_filter = ('created_at',)  # Remove 'category'
    search_fields = ('name', 'description')
