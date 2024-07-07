""" from django.contrib import admin
from django.urls import include, path
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from django.conf import settings
from django.conf.urls.static import static
from api.views import CreateUserView, create_payment_intent

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreateUserView.as_view(), name="register"),
    path('api/token/', TokenObtainPairView.as_view(), name="get_token"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name="refresh"),
    path('api-auth/', include("rest_framework.urls")),
    path('api/', include('api.urls')), 
     path('api/create-payment-intent/', create_payment_intent, name="create_payment_intent"), 
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

 """



from django.contrib import admin
from django.urls import include, path
from api.views import CreateUserView, create_payment_intent
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreateUserView.as_view(), name="register"),
    path('api/token/', TokenObtainPairView.as_view(), name="get_token"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name="refresh"),
    path('api-auth/', include("rest_framework.urls")),
    path('api/', include('api.urls')),
    path('api/create-payment-intent/', create_payment_intent, name="create_payment_intent")
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
