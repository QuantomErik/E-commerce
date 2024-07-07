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
""" import os """


from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import stripe
import json

""" stripe.api_key = settings.STRIPE_SECRET_KEY """
""" stripe.api_key = 'pk_test_51PZJITL1uQnSO6RdmlYKBQxfEc4KgkP7as0Ae5sTA9q5ggSPH4PJr8hW1BLyvlKNrYPFLi2Kab10nM1wOr1VB38a003uN4bhf3' """
stripe.api_key = 'sk_test_51PZJITL1uQnSO6RdJJzR9DTvrBdWHJL514usZLOGLBPWJdtt8t9ZQ0GkoyGUCWLCgUaN62EHuxRAjFRfhaA2UIcX00Xzx7WFgI'



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




""" @csrf_exempt
def create_payment_intent(request):
    try:
        data = json.loads(request.body)
        payment_method_id = data['payment_method']
        amount = int(float(data['amount']) * 100)  

        
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='usd',
            payment_method=payment_method_id,
            confirmation_method='manual',
            confirm=True,
            return_url='http://localhost:5173/payment-success',
            
        )

        return JsonResponse({
            'client_secret': intent.client_secret,
            'status': intent.status,
        })
    except Exception as e:
        import traceback
        traceback.print_exc()
        return JsonResponse({'error': str(e)}, status=500) """

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
        import traceback
        traceback.print_exc()
        return JsonResponse({'error': str(e)}, status=500)

""" from django.views.decorators.csrf import csrf_exempt
import stripe
import json

@csrf_exempt
def create_checkout_session(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            cart_items = data.get('cartItems', [])
            line_items = []

            for item in cart_items:
                line_items.append({
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': item['name'],
                        },
                        'unit_amount': int(float(item['price']) * 100),  # Convert to cents
                    },
                    'quantity': item['quantity'],
                })

            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=line_items,
                mode='payment',
                success_url='http://localhost:8000/success',
                cancel_url='http://localhost:8000/cancel',
            )
            return JsonResponse({'id': session.id})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=403) """




""" @csrf_exempt
def success(request):
    return render(request, 'success.html')

@csrf_exempt
def cancel(request):
    return render(request, 'cancel.html') """






    


""" import json
import base64
import requests
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

KLARNA_API_URL = 'https://api.playground.klarna.com'  

def get_klarna_auth_header():
    auth = f"{settings.KLARNA_USERNAME}:{settings.KLARNA_PASSWORD}"
    encoded_auth = base64.b64encode(auth.encode('utf-8')).decode('utf-8')
    return {'Authorization': f'Basic {encoded_auth}'}

def calculate_order_amount(items):
   
    return 9500

@csrf_exempt
def create_klarna_payment_session(request):
    try:
        data = json.loads(request.body)
        items = data['items']

        payload = {
            "acquiring_channel": "ECOMMERCE",
            "intent": "buy",
            "purchase_country": "SE",
            "purchase_currency": "SEK",
            "locale": "en-SE",
            "order_amount": calculate_order_amount(items),
            "order_tax_amount": 1900,
            "order_lines": items,
            "merchant_urls": {
                "authorization": "https://yourdomain.com/klarna/authorization_callback/"
            }
        }

        response = requests.post(
            f"{KLARNA_API_URL}/payments/v1/sessions",
            headers={
                "Content-Type": "application/json",
                **get_klarna_auth_header()
            },
            data=json.dumps(payload)
        )
        response_data = response.json()

        if response.status_code != 200:
            return JsonResponse({'error': response_data}, status=response.status_code)

        return JsonResponse(response_data)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    

    # views.py
@csrf_exempt
def klarna_authorization_callback(request):
    try:
        data = json.loads(request.body)
        authorization_token = data.get('authorization_token')
        session_id = data.get('session_id')
        
        return JsonResponse({'status': 'success'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


# views.py
@csrf_exempt
def create_order_with_authorization_token(request):
    try:
        data = json.loads(request.body)
        authorization_token = data['authorization_token']

        response = requests.post(
            f"{KLARNA_API_URL}/payments/v1/authorizations/{authorization_token}/order",
            headers={
                "Content-Type": "application/json",
                **get_klarna_auth_header()
            },
            data=json.dumps({
                "purchase_country": "US",
                "purchase_currency": "USD",
                "billing_address": {
                    "given_name": "John",
                    "family_name": "Doe",
                    "email": "john@doe.com",
                    "title": "Mr",
                    "street_address": "Lombard St 10",
                    "street_address2": "Apt 214",
                    "city": "San Francisco",
                    "region": "CA",
                    "postal_code": "90210",
                    "country": "US"
                }
            })
        )
        response_data = response.json()
        return JsonResponse(response_data)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
 """





