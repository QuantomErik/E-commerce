from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CategoryViewSet, CreateUserView, create_payment_intent, OrderViewSet, UserViewSet, AddressViewSet, BestSellersViewSet, AllProductsViewSet, TodaysDealsViewSet
from . import views

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'users', UserViewSet, basename='user')
router.register(r'addresses', AddressViewSet, basename='address')
router.register(r'best-sellers', BestSellersViewSet, basename='best-sellers')
router.register(r'all-products', AllProductsViewSet, basename='all-products')
router.register(r'todays-deals', TodaysDealsViewSet, basename='todays-deals')


urlpatterns = [
    path('', include(router.urls)),
    path('create-payment-intent/', create_payment_intent, name='create-payment-intent'),
    path('set-csrf/', views.set_csrf_token, name='set-csrf'),
]
