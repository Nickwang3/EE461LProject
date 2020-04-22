from .base import *

SECRET_KEY = 'm)7m6c9&_92esq_kb9aix(f@%fq=*hbu4ic+f7i4n!r1&fijr@'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = [
    # 'ec2-13-59-7-216.us-east-2.compute.amazonaws.com',
    'django-env.zphgcpmf2t.us-west-2.elasticbeanstalk.com',
    'http://reactapp-ee461l.s3-website-us-east-1.amazonaws.com'
]

CORS_ORIGIN_WHITELIST = [
    # 'ec2-13-59-7-216.us-east-2.compute.amazonaws.com',
    'http://django-env.zphgcpmf2t.us-west-2.elasticbeanstalk.com',
    'http://reactapp-ee461l.s3-website-us-east-1.amazonaws.com'
]

# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'prod',
        'USER': 'postgres',
        'PASSWORD': '*GR3Dpr%9LMG',
        'HOST': 'ee461l-django-app-database.cs3khvsyqwtx.us-east-2.rds.amazonaws.com',
        'PORT': '5432',
    }
}

# Api keys
GOODREADS_API_KEY = 'hwYP09p0h6SR1MhNTiDVDA'
NYTIMES_API_KEY = 'eXcTvaXGos5A211SGhXlpZJeyhNiWGb0'
MYSPORTSFEED_API_KEY = '2ac8aad0-1217-4677-854c-83b952'