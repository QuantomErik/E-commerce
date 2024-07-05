from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer

from rest_framework import permissions

from rest_framework import filters



# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


""" class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny] 
    Change to [permissions.IsAuthenticated] for production
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'created_at']
 """


class FirstRowProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()[:9]  # Adjust the slice as needed
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'created_at']

class SecondRowProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()[9:14]  # Adjust the slice as needed
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'created_at']