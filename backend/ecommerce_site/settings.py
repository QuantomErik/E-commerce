

from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv
import os

load_dotenv()


BASE_DIR = Path(__file__).resolve().parent.parent

STRIPE_SECRET_KEY = 'sk_test_51PZJITL1uQnSO6RdJJzR9DTvrBdWHJL514usZLOGLBPWJdtt8t9ZQ0GkoyGUCWLCgUaN62EHuxRAjFRfhaA2UIcX00Xzx7WFgI'



SECRET_KEY = 'django-insecure-d@9#@*!ca2artazga(*^7ezrhp8ly+3msc$=$xfm+kg#^m)z!^'


DEBUG = True

ALLOWED_HOSTS = ["*"]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=300),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=2),
}


# Application definition

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
]

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
]

# Content Security Policy settings
CSP_DEFAULT_SRC = ("'self'",)
CSP_SCRIPT_SRC = ("'self'", "https://js.stripe.com", "https://q.stripe.com", "https://gc.kis.v2.scr.kaspersky-labs.com")
CSP_STYLE_SRC = ("'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://gc.kis.v2.scr.kaspersky-labs.com")
CSP_FONT_SRC = ("'self'", "https://fonts.gstatic.com", "https://gc.kis.v2.scr.kaspersky-labs.com")
CSP_SCRIPT_SRC = ("'self'", "https://js.stripe.com", "https://q.stripe.com", "https://gc.kis.v2.scr.kaspersky-labs.com")



ROOT_URLCONF = 'ecommerce_site.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        # 'DIRS': [os.path.join(BASE_DIR, 'templates')],
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

WSGI_APPLICATION = 'ecommerce_site.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

""" DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'railway',
        'USER': 'postgres',
        'PASSWORD': 'qLtMTNTpBIchTJMpJNZPOTfaptIPsNTJ',
        'HOST': 'roundhouse.proxy.rlwy.net',
        'PORT': '45718',
    }
} """

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'initial_db',
        'USER': 'postgres',
        'PASSWORD': 'Chelseapizda-1',
        'HOST': 'database-1.c5260gei80wz.eu-north-1.rds.amazonaws.com',
        'PORT': '5432',
    }
}



# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

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


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = '/static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

""" AUTH_USER_MODEL = 'accounts.CustomUser' """

# settings.py

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')




# settings.py
""" KLARNA_USERNAME = 'a6ad8fd8-8291-42c6-85e2-6d4a73cbfd85'
KLARNA_PASSWORD = 'klarna_test_api_YTBtb09Ec1Rlbkh3c1Z0PzBpQ1g5cUFUIzYhWUdSV2ssYTZhZDhmZDgtODI5MS00MmM2LTg1ZTItNmQ0YTczY2JmZDg1LDEsbmtUUTlJMlgwSkFZR1E3WVhIOURQdzJWQ2E0eGJTTHVMMXl4NHQyNUgyVT0' """



# Ensure this matches the output directory in Vite's build config
""" STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'frontend_build')
]

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles') """