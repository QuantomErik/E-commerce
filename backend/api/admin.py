""" from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'description', 'image', 'created_at')
    # Ensure that there are no extra characters or incorrect field names
    list_filter = ('created_at',)  # Remove 'category'
    search_fields = ('name', 'description') """

# api/admin.py
from django.contrib import admin
from .models import Product, Category

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'description', 'category', 'distance_to_sun', 'created_at')  # Ensure the field names are correct
    fields = ('name', 'price', 'description', 'image', 'category', 'distance_to_sun')
    search_fields = ('name', 'description', 'category__name')
    list_filter = ('category',)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)

