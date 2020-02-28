from django.urls import include, path
from rest_framework import routers
import apiapp.views as views
from django.contrib import admin

#register api endpoints and their views
router = routers.DefaultRouter()
router.register(r'users/getusers', views.UserViewSet)
router.register(r'authors/getauthors', views.AuthorViewSet)
router.register(r'books/getbooks', views.BookViewSet)
router.register(r'reviews/getreviews', views.ReviewViewSet)
router.register(r'meetups/getmeetups', views.MeetupViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
