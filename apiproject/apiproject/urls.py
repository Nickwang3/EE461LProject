from django.urls import include, path
from rest_framework import routers
import apiapp.views as views
from django.contrib import admin

#register api endpoints and their views
router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'authors', views.AuthorViewSet, basename='author')
router.register(r'books', views.BookViewSet, basename='book')
router.register(r'reviews', views.ReviewViewSet, basename='review')
router.register(r'meetups', views.MeetupViewSet, basename='meetup')
router.register(r'teams', views.TeamViewSet, basename='team')
router.register(r'players', views.PlayerViewSet, basename='player')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/v1/books/isbn/<str:isbn>', views.get_book_by_isbn, name='get_book_by_isbn'),
    path('api/v1/players', views.get_players, name="get_players"),
    path('api/v1/teams', views.get_teams, name="get_teams")
]
