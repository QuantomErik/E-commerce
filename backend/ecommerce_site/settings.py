from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Base directory of the project
BASE_DIR = Path(__file__).resolve().parent.parent

# Stripe secret key
STRIPE_SECRET_KEY = os.getenv('STRIPE_SECRET_KEY', 'sk_test_51PZJITL1uQnSO6RdJJzR9DTvrBdWHJL514usZLOGLBPWJdtt8t9ZQ0GkoyGUCWLCgUaN62EHuxRAjFRfhaA2UIcX00Xzx7WFgI')

# Django secret key
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-d@9#@*!ca2artazga(*^7ezrhp8ly+3msc$=$xfm+kg#^m)z!^')

# Debug mode
DEBUG = True

# Allowed hosts
ALLOWED_HOSTS = ["*"]

# REST Framework settings
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}

# JWT settings
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=60),
}
""" SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=300),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=2),
}
 """



# Installed applications
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "api",
    "rest_framework",
    "corsheaders",
    "csp",
    "django_filters",
    "storages",
]

# Middleware settings
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
    "csp.middleware.CSPMiddleware",
    'whitenoise.middleware.WhiteNoiseMiddleware', 
]


CORS_ALLOWED_ORIGINS = [
    "https://erikyang.se",
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]

CSRF_TRUSTED_ORIGINS = [
    'https://erikyang.se',
    'https://www.erikyang.se',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]


CSP_DEFAULT_SRC = ("'self'",)
CSP_SCRIPT_SRC = (
    "'self'",
    "https://js.stripe.com",
    "https://q.stripe.com",
    "https://gc.kis.v2.scr.kaspersky-labs.com",
    "'unsafe-inline'",  # Allow inline scripts
    "'unsafe-eval'"     # Allow eval scripts
)
CSP_STYLE_SRC = (
    "'self'",
    "'unsafe-inline'",  # Allow inline styles
    "https://fonts.googleapis.com",
    "https://gc.kis.v2.scr.kaspersky-labs.com"
)
CSP_FONT_SRC = (
    "'self'",
    "https://fonts.gstatic.com",
    "https://gc.kis.v2.scr.kaspersky-labs.com"
)
CSP_IMG_SRC = (
    "'self'",
    "data:",  # Allow inline images (base64 encoded)
    "https://gc.kis.v2.scr.kaspersky-labs.com",
    "https://*.stripe.com",
    "https://quantombucket.s3.amazonaws.com"  # Allow images from your S3 bucket
)
CSP_CONNECT_SRC = (
    "'self'",
    "https://*.stripe.com",
    "https://gc.kis.v2.scr.kaspersky-labs.com"
)
CSP_REPORT_URI = "https://q.stripe.com/csp-report"

if DEBUG:
    CSP_SCRIPT_SRC += ("'unsafe-eval'", "'unsafe-inline'",)
    CSP_STYLE_SRC += ("'unsafe-inline'",)


# URL configuration
ROOT_URLCONF = 'ecommerce_site.urls'

# Template settings
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI application
WSGI_APPLICATION = 'ecommerce_site.wsgi.application'

# Database configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', 'initial_db'),
        'USER': os.getenv('DB_USER', 'postgres'),
        'PASSWORD': os.getenv('DB_PASSWORD', 'Chelseapizda-1'),
        'HOST': os.getenv('DB_HOST', 'database-1.c5260gei80wz.eu-north-1.rds.amazonaws.com'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Localization settings
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files settings
# STATIC_URL = '/static/'
STATIC_URL = '/ecommerce/static/'
""" STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
    
] """

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS settings
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

# AWS S3 settings
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = os.getenv('AWS_STORAGE_BUCKET_NAME')
AWS_S3_REGION_NAME = os.getenv('AWS_S3_REGION_NAME')  # Use the short code for the region
AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400',
}

# Whitenoise configuration for serving static files in production
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Media files (Uploads) settings
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/products/'

# Ensure environment variables are loaded
print(f'AWS_ACCESS_KEY_ID: {AWS_ACCESS_KEY_ID}')
print(f'AWS_SECRET_ACCESS_KEY: {AWS_SECRET_ACCESS_KEY}')
print(f'AWS_STORAGE_BUCKET_NAME: {AWS_STORAGE_BUCKET_NAME}')
print(f'AWS_S3_REGION_NAME: {AWS_S3_REGION_NAME}')
print(f'AWS_S3_CUSTOM_DOMAIN: {AWS_S3_CUSTOM_DOMAIN}')


# Ensure FORCE_SCRIPT_NAME is set to handle subdirectory
# FORCE_SCRIPT_NAME = '/ecommerce'
STATIC_URL = '/ecommerce/static/'
MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/products/'


""" LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'debug.log',
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file', 'console'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'your_app_name': {
            'handlers': ['file', 'console'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
} """
