# api/models.py
from django.db import models
import logging
from django.contrib.auth.models import User

logger = logging.getLogger(__name__)

class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

""" class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    distance_to_sun = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    best_seller = models.BooleanField(default=False)
    todays_deal = models.BooleanField(default=False)
    discount = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        logger.info(f'File path: {self.image.url}')

    class Meta:
        ordering = ['category__name', 'distance_to_sun']

    def __str__(self):
        return self.name """

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    distance_to_sun = models.CharField(max_length=255, null=True, blank=True)
    best_seller = models.BooleanField(default=False)
    todays_deal = models.BooleanField(default=False)
    discount = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    
    # Fields for all products
    age = size = models.CharField(max_length=255, null=True, blank=True)
    distance_to_earth = models.CharField(max_length=255, null=True, blank=True)
    size = models.CharField(max_length=255, null=True, blank=True)
    mass = models.CharField(max_length=255, null=True, blank=True)
    surface_temperature = models.CharField(max_length=255, null=True, blank=True)
    gravity = models.CharField(max_length=255, null=True, blank=True)
    atmosphere = models.TextField(null=True, blank=True)
    surface_features = models.TextField(null=True, blank=True)
    
   

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.image:
            logger.info(f'File path: {self.image.url}')

    class Meta:
        ordering = ['category__name', 'distance_to_sun']  # Order by category name first, then by distance to sun

    def __str__(self):
        return self.name
    

class ConstellationDetail(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='constellation_detail')
    distance_to_earth = models.CharField(max_length=255)
    size = models.CharField(max_length=255)
    brightest_star = models.CharField(max_length=255)
    best_viewing_time = models.CharField(max_length=255)
    number_of_stars = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Details for {self.product.name}"
    


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    created_at = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    email = models.EmailField(max_length=255, blank=True, null=True)
    cardholder_name = models.CharField(max_length=255, blank=True, null=True)
    masked_card_number = models.CharField(max_length=19, blank=True, null=True)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product.name} ({self.quantity})"


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address_type = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    street_address = models.TextField()
    postcode = models.CharField(max_length=20)
    city = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.address_type} - {self.street_address}, {self.city}, {self.country}"
    

    

class Deal(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='deals')
    discount = models.DecimalField(max_digits=5, decimal_places=2)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.product.name} - {self.discount}% off"    