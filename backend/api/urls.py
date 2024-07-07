from django.urls import path, include
from rest_framework.routers import DefaultRouter
""" from .views import ProductViewSet """
from .views import FirstRowProductViewSet, SecondRowProductViewSet
from .views import create_payment_intent

""" from api.views import create_checkout_session, success, cancel """

""" from .views import create_klarna_payment_session
from .views import klarna_authorization_callback
from .views import create_order_with_authorization_token """

""" router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product') """

router = DefaultRouter()
router.register(r'first-row-products', FirstRowProductViewSet, basename='first-row-product')
router.register(r'second-row-products', SecondRowProductViewSet, basename='second-row-product')


urlpatterns = [
    path('', include(router.urls)),
    path('create-payment-intent/', create_payment_intent, name='create-payment-intent'),
    # path('create-checkout-session/', create_checkout_session, name='create-checkout-session'),
    # path('success/', success, name='success'),
    # path('cancel/', cancel, name='cancel'),
    # path('create-klarna-payment-session/', create_klarna_payment_session, name='create-klarna-payment-session'),
    # path('klarna/authorization_callback/', klarna_authorization_callback, name='klarna-authorization-callback'),
    # path('create-order/', create_order_with_authorization_token, name='create-order'),
]


