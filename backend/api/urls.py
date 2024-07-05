from django.urls import path, include
from rest_framework.routers import DefaultRouter
""" from .views import ProductViewSet """
from .views import FirstRowProductViewSet, SecondRowProductViewSet

""" router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product') """

router = DefaultRouter()
router.register(r'first-row-products', FirstRowProductViewSet, basename='first-row-product')
router.register(r'second-row-products', SecondRowProductViewSet, basename='second-row-product')


urlpatterns = [
    path('', include(router.urls)),
]
