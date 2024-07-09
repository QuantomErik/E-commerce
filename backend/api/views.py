from django.contrib.auth.models import User
from rest_framework import generics, viewsets, filters
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product, Category
from .serializers import UserSerializer, ProductSerializer, CategorySerializer
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import stripe
import json

stripe.api_key = settings.STRIPE_SECRET_KEY

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class ProductViewSet(viewsets.ModelViewSet):
    # queryset = Product.objects.all()
    # queryset = Product.objects.all().order_by('category__name', 'created_at')  # Ensure the products are ordered by category and creation date
    queryset = Product.objects.all().order_by('category__name', 'distance_to_sun')  # Order by category and distance to sun
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    search_fields = ['name', 'description', 'category__name']
    ordering_fields = ['price', 'created_at']
    filterset_fields = ['category', 'price']

    def get_serializer_context(self):
        return {'request': self.request}

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

@csrf_exempt
def create_payment_intent(request):
    try:
        data = json.loads(request.body)
        payment_method_id = data['payment_method']
        amount = int(float(data['amount']) * 100)  # Convert to cents

        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='usd',
            payment_method=payment_method_id,
            confirmation_method='automatic',
        )

        return JsonResponse({
            'client_secret': intent.client_secret,
            'status': intent.status,
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
