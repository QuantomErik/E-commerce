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
from .models import Product, Category, Order, OrderItem, Deal

""" @admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'description', 'category', 'distance_to_sun', 'created_at', 'best_seller')
    fields = ('name', 'price', 'description', 'image', 'category', 'distance_to_sun', 'best_seller')
    search_fields = ('name', 'description', 'category__name')
    list_filter = ('category', 'best_seller', 'todays_deal') """

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'name', 'price', 'description', 'category', 'distance_to_sun', 'created_at', 
        'best_seller', 'todays_deal', 'discovery_date', 'distance_to_earth', 'size', 
        'mass', 'orbital_period', 'surface_temperature', 'gravity', 'composition', 
        'constellation', 'orbital_distance', 'atmosphere', 'moons', 'rotation_period', 
        'magnetic_field', 'rings', 'habitable', 'parent_planet', 
        'orbital_distance_from_planet', 'surface_features', 'tidal_effects', 
        'geological_activity', 'main_stars', 'best_viewing_time', 'mythology', 
        'quadrant', 'area', 'visibility'
    )
    fields = (
        'name', 'price', 'description', 'image', 'category', 'distance_to_sun', 
        'best_seller', 'todays_deal', 'discovery_date', 'distance_to_earth', 'size', 
        'mass', 'orbital_period', 'surface_temperature', 'gravity', 'composition', 
        'constellation', 'orbital_distance', 'atmosphere', 'moons', 'rotation_period', 
        'magnetic_field', 'rings', 'habitable', 'parent_planet', 
        'orbital_distance_from_planet', 'surface_features', 'tidal_effects', 
        'geological_activity', 'main_stars', 'best_viewing_time', 'mythology', 
        'quadrant', 'area', 'visibility'
    )
    search_fields = ('name', 'description', 'category__name')
    list_filter = ('category', 'best_seller', 'todays_deal')

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

@admin.register(Deal)
class DealAdmin(admin.ModelAdmin):
    list_display = ('product', 'discount', 'start_date', 'end_date', 'is_active')
    list_filter = ('is_active', 'start_date', 'end_date')
    search_fields = ('product__name',)    

