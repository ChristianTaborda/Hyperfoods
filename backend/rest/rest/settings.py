import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'b(5y)15ik$=e9eld1%^a0f*-q!(#=8r@tk4=%u$l4fkqvqf!tb'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True


ALLOWED_HOSTS = [
    '*'
]

# Application definition


DJANGO_APPS = (
    'django.contrib.contenttypes',
    'django.contrib.auth',
    'django.contrib.sessions',
    'django.contrib.admin',
    'django.contrib.messages',
    'django.contrib.staticfiles',
)

THIRD_PARTY_APPS = (
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
)

SINGLE_APPS = (
    'categories',
    'ingredients',
    'products',
    'combos',
    'invoices',
    'invoiceDetails',
    'reports',
    'front',
)

PRINCIPAL = (
    'django_tenants',
    'tenant',
)

SHARED = (
    'users',
)

SHARED_APPS = PRINCIPAL + DJANGO_APPS + THIRD_PARTY_APPS + SHARED
TENANT_APPS = DJANGO_APPS + THIRD_PARTY_APPS + SHARED + SINGLE_APPS 

INSTALLED_APPS = list(SHARED_APPS) + [app for app in TENANT_APPS if app not in SHARED_APPS]

MIDDLEWARE = [
    'django_tenants.middleware.main.TenantMainMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.template.context_processors.debug',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

ROOT_URLCONF = 'rest.tenant_urls'
# Con esta línea se tiene una separación de las urls del tenant public  y de las urls para los tenants
PUBLIC_SCHEMA_URLCONF = 'rest.public_urls'

WSGI_APPLICATION = 'rest.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django_tenants.postgresql_backend',
        # 'NAME': 'hyperfoods',
        'NAME': 'localhost',
        'USER': 'postgres',
        'PASSWORD': 'stemen',
        'HOST': 'hyperfoods.eastus2.azurecontainer.io',
        'PORT': '5432',
    }
}

DATABASE_ROUTERS = (
    'django_tenants.routers.TenantSyncRouter',
)

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/
#setting static files, this is essential to work with react
STATIC_ROOT = 'static'
STATIC_URL = '/static/'

REACT_APP_DIR = os.path.join(BASE_DIR, 'front') 

STATICFILES_DIRS = [
    os.path.join(REACT_APP_DIR, 'build', 'static'),
]


#setting media files
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

#DEFAULT_FILE_STORAGE = 'tenant_schemas.storage.TenantFileSystemStorage'
CORS_ORIGIN_ALLOW_ALL = True

AUTHENTICATION_BACKENDS = (
        'django.contrib.auth.backends.ModelBackend',
    )

REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    """ USE THIS TO AUTHENTICATE USERS
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ],
    """
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',  # <-- And here
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser'
    ]
}

AUTH_USER_MODEL = 'users.CustomUser'

REST_AUTH_SERIALIZERS = {
    "USER_DETAILS_SERIALIZER": "users.serializers.UserSerializer",
}
REST_AUTH_REGISTER_SERIALIZERS = {
    "REGISTER_SERIALIZER": "users.serializers.UserSerializer",
}


TENANT_MODEL = "tenant.Tenant"
TENANT_DOMAIN_MODEL = "tenant.Domain"  # app.Model

#DEFAULT_FILE_STORAGE = 'tenant_schemas.storage.TenantFileSystemStorage'

EMAIL_HOST = "smtp.googlemail.com"
EMAIL_port = 587
EMAIL_HOST_USER = 'roothyperfoods@gmail.com'
EMAIL_HOST_PASSWORD = 'hyperfoods9-'
EMAIL_USE_TLS = True
