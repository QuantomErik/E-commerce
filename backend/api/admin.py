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
from .models import Product, Category, Order, OrderItem

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'description', 'category', 'distance_to_sun', 'created_at', 'best_seller')
    fields = ('name', 'price', 'description', 'image', 'category', 'distance_to_sun', 'best_seller')
    search_fields = ('name', 'description', 'category__name')
    list_filter = ('category', 'best_seller')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'created_at', 'total_amount')
    list_filter = ('created_at', 'user')
    search_fields = ('user__username', 'user__email')
    inlines = [OrderItemInline]

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'quantity', 'price')
    list_filter = ('order', 'product')
    search_fields = ('order__user__username', 'product__name')

