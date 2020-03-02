from django.urls import include, path
from rest_framework import routers
import apiapp.views as views
from django.contrib import admin

#register api endpoints and their views
router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'authors', views.AuthorViewSet, basename='author')
router.register(r'books', views.BookViewSet, basename='book')
# router.register(r'reviews/getreviews', views.ReviewViewSet.list)
# router.register(r'meetups/getmeetups', views.MeetupViewSet.list)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
