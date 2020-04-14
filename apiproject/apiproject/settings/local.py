from .base import *

SECRET_KEY = 'm)7m6c9&_92esq_kb9aix(f@%fq=*hbu4ic+f7i4n!r1&fijr@'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

CORS_ORIGIN_ALLOW_ALL = True

# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'dev',
        'USER': 'postgres',
        'PASSWORD': '*GR3Dpr%9LMG',
        'HOST': 'ee461l-django-app-database.cs3khvsyqwtx.us-east-2.rds.amazonaws.com',
        'PORT': '5432',
    }
}

# Api keys
# GOODREADS_API_KEY = 'hwYP09p0h6SR1MhNTiDVDA'
# NYTIMES_API_KEY = 'eXcTvaXGos5A211SGhXlpZJeyhNiWGb0'