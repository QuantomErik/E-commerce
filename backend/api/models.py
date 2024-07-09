# api/models.py
from django.db import models

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
    distance_to_sun = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)  # New attribute

    class Meta:
        ordering = ['category__name', 'distance_to_sun']  # Order by category name first, then by distance to sun

    def __str__(self):
        return self.name
