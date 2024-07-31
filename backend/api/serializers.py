from django.contrib.auth.models import User
from rest_framework import serializers
""" from .models import Product, Category """
from .models import Product, Category, Order, OrderItem, Address, Deal

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    image_url = serializers.SerializerMethodField()
    discount = serializers.SerializerMethodField()

    """ class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image_url', 'category', 'distance_to_sun', 'created_at', 'best_seller', 'todays_deal', 'discount'] """
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'image_url', 'category', 
            'distance_to_sun', 'created_at', 'best_seller', 'todays_deal', 'discount',
            'age', 'distance_to_earth', 'size', 'mass',
            'surface_temperature', 'gravity', 'atmosphere',
            'surface_features',
        ]

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None
    
    def get_discount(self, obj):
        """ current_time = timezone.now() """
        deal = obj.deals.filter(is_active=True).first()
        if deal:
            return deal.discount
        return None


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'price']

""" class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        model = Order
        fields = ['id', 'created_at', 'total_amount', 'items'] """

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        model = Order
        fields = ['id', 'created_at', 'total_amount', 'email', 'cardholder_name', 'masked_card_number', 'items']


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
        extra_kwargs = {
            'user': {'read_only': True},
             }
        



class DealSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = Deal
        fields = ['product', 'discount', 'start_date', 'end_date', 'is_active']       