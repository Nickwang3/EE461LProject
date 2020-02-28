from .base import *

SECRET_KEY = 'm)7m6c9&_92esq_kb9aix(f@%fq=*hbu4ic+f7i4n!r1&fijr@'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['ec2-13-59-7-216.us-east-2.compute.amazonaws.com']

# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': '*GR3Dpr%9LMG',
        'HOST': 'ee461l-django-app-database.cs3khvsyqwtx.us-east-2.rds.amazonaws.com',
        'PORT': '5432',
    }
}
