from django.contrib.auth.models import User
from rest_framework import generics, viewsets, filters
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
""" from .models import Product, Category """
from .models import Product, Category, Order
""" from .serializers import UserSerializer, ProductSerializer, CategorySerializer """
from .serializers import UserSerializer, ProductSerializer, CategorySerializer, OrderSerializer, AddressSerializer
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import stripe
import json
import logging
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, status
from .models import Order, OrderItem, Address

from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse

@ensure_csrf_cookie
def set_csrf_token(request):
    return JsonResponse({'detail': 'CSRF cookie set'})

logger = logging.getLogger(__name__)

def some_view(request):
    logger.info(f"Received request from {request.META['REMOTE_ADDR']}")
    # rest of the view code


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

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]    

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


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        try:
            user = self.request.user
            logger.info(f"Fetching orders for user: {user}")
            queryset = Order.objects.filter(user=user).order_by('-created_at')
            logger.info(f"Orders fetched: {queryset}")
            return queryset
        except Exception as e:
            logger.error(f"Error fetching orders: {e}")
            raise e

    """ @action(detail=False, methods=['post'], url_path='create_order')
    def create_order(self, request):
        print("create_order endpoint hit")
        logger.info(f"create_order endpoint hit by user: {request.user}")
        user = request.user
        cart_items = request.data.get('cart_items', [])
        total_amount = request.data.get('total_amount', 0)
        email = request.data.get('email')
        cardholder_name = request.data.get('cardholder_name')
        masked_card_number = request.data.get('masked_card_number')

        logger.info(f"Received cart items: {cart_items}")
        logger.info(f"Total amount: {total_amount}")
        logger.info(f"Email: {email}, Cardholder Name: {cardholder_name}, Masked Card Number: {masked_card_number}")

        if not cart_items:
            return Response({'detail': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(user=user, total_amount=total_amount, email=email, cardholder_name=cardholder_name, masked_card_number=masked_card_number)
        for item in cart_items:
            OrderItem.objects.create(
            order=order,
            product_id=item['product'],
            quantity=item['quantity'],
            price=item['price']
        )

        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED) """
    
    @action(detail=False, methods=['post'], url_path='create_order')
    def create_order(self, request):
        logger.info(f"create_order endpoint hit by user: {request.user}")
        user = request.user
        cart_items = request.data.get('cart_items', [])
        total_amount = request.data.get('total_amount', 0)
        email = request.data.get('email')
        cardholder_name = request.data.get('cardholder_name')
        masked_card_number = request.data.get('masked_card_number')

        logger.info(f"create_order endpoint hit by user: {request.user}")
        logger.info(f"Received cart items: {cart_items}")
        logger.info(f"Total amount: {total_amount}")
        logger.info(f"Email: {email}, Cardholder Name: {cardholder_name}, Masked Card Number: {masked_card_number}")

        if not cart_items:
            return Response({'detail': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(
            user=user,
            total_amount=total_amount,
            email=email,
            cardholder_name=cardholder_name,
            masked_card_number=masked_card_number
        )

        for item in cart_items:
            OrderItem.objects.create(
                order=order,
                product_id=item['product'],  # Assuming item['product'] is the product ID
                quantity=item['quantity'],
                price=item['price']
            )

        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        logger.info(f"Fetching addresses for user: {user}")
        return Address.objects.filter(user=user)

    def perform_create(self, serializer):
        user = self.request.user
        logger.info(f"Creating address for user: {user} with data: {self.request.data}")
        serializer.save(user=user)



class BestSellersViewSet(viewsets.ViewSet):
    def list(self, request):
        sort_option = request.query_params.get('sort', 'popularity')
        queryset = Product.objects.filter(best_seller=True)

        if sort_option == 'price-asc':
            queryset = queryset.order_by('price')
        elif sort_option == 'price-desc':
            queryset = queryset.order_by('-price')
        elif sort_option == 'created_at':
            queryset = queryset.order_by('-created_at')
        elif sort_option == 'distance-to-sun':
            queryset = queryset.order_by('distance_to_sun')
        elif sort_option == 'distance-to-sun-desc':
            queryset = queryset.order_by('-distance_to_sun')

        serializer = ProductSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)      