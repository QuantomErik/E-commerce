# api/models.py
from django.db import models
import logging
from django.contrib.auth.models import User

logger = logging.getLogger(__name__)

class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    distance_to_sun = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    best_seller = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        logger.info(f'File path: {self.image.url}')

    class Meta:
        ordering = ['category__name', 'distance_to_sun']  # Order by category name first, then by distance to sun

    def __str__(self):
        return self.name
    


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