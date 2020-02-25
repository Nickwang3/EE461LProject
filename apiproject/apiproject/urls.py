from django.urls import include, path
from rest_framework import routers
import apiapp.views as views
from django.contrib import admin

#register api endpoints and their views
router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'authors', views.AuthorViewSet)
router.register(r'books', views.BookViewSet)
router.register(r'reviews', views.ReviewViewSet)
router.register(r'meetups', views.MeetupViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
