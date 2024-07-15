""" from api.views import CreateUserView, create_payment_intent
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

from django.http import HttpResponse

def index(request):
    return HttpResponse("Welcome to the E-commerce site!")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreateUserView.as_view(), name="register"),
    path('api/token/', TokenObtainPairView.as_view(), name="get_token"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name="refresh"),
    path('api-auth/', include("rest_framework.urls")),
    path('api/', include('api.urls')),
    path('api/create-payment-intent/', create_payment_intent, name="create_payment_intent"),
    path('ecommerce/', index), 
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
 """


# USE THIS WHEN DEPLOYING

from api.views import CreateUserView, create_payment_intent
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse

def index(request):
    return HttpResponse("Welcome to the E-commerce site!")

urlpatterns = [
    path('ecommerce/admin/', admin.site.urls),
    path('ecommerce/api/user/register/', CreateUserView.as_view(), name="register"),
    path('ecommerce/api/token/', TokenObtainPairView.as_view(), name="get_token"),
    path('ecommerce/api/token/refresh/', TokenRefreshView.as_view(), name="refresh"),
    path('ecommerce/api-auth/', include("rest_framework.urls")),
    path('ecommerce/api/', include('api.urls')),
    path('ecommerce/api/create-payment-intent/', create_payment_intent, name="create_payment_intent"),
    path('ecommerce/', index), 
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


