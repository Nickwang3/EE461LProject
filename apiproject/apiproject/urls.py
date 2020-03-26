from django.urls import include, path
from rest_framework import routers
import apiapp.views as views
from django.contrib import admin

#register api endpoints and their views
router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'teams', views.TeamViewSet, basename='team')
router.register(r'players', views.PlayerViewSet, basename='player')
router.register(r'games',views.GameViewSet, basename='game')
router.register(r'teammembers', views.TeamMemberViewSet, basename='teammember')


urlpatterns = [
    path('', views.redirect_to_api),
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/v1/books/isbn/<str:isbn>', views.get_book_by_isbn, name='get_book_by_isbn'),
    path('api/v1/players/team_id/<str:team_id>', views.get_players_by_team_id, name="get_players_by_team_id"),
    path('api/v1/teams/team_id/<str:team_id>', views.get_team_by_team_id, name="get_team_by_team_id"),
    path('api/v1/games/game_date/<str:game_date>',views.get_games_by_date, name ="get_games_by_date"),
    path('api/v1/teammembers/add_teammember/', views.post_teammember, name='post_teammember'),
    path('api/v1/teammembers/github_username/<str:github_username>', views.get_teammembers_by_github_username, name="get_teammembers_by_github_username"),
    path('api/v1/teammembers/update_git_stats', views.update_git_stats, name='update_git_stats'),
    path('api/v1/weather/current_weather/team_id/<str:team_id>', views.get_current_weather_by_team_id, name="get_current_weather_by_team_id")
]
