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
router.register(r'teamrecords', views.TeamRecordViewSet, basename='teamrecord')
router.register(r'pitcherstats', views.PitcherStatsViewSet, basename='pitcherstats')
router.register(r'hitterstats', views.HitterStatsViewSet, basename='hitterstats')
router.register(r'tickets', views.TicketViewSet, basename="tickets")
router.register(r'boxscores', views.BoxScoreViewSet, basename="boxscore")

urlpatterns = [
    path('', views.redirect_to_api),
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/v1/teams/team_name/<str:team_name>',views.TeamViewSet.get_team_by_name, name='get_team_by_name'),
    path('api/v1/players/team_id/<str:team_id>', views.PlayerViewSet.get_players_by_team_id, name="get_players_by_team_id"),
    path('api/v1/teams/team_id/<str:team_id>', views.TeamViewSet.get_team_by_team_id, name="get_team_by_team_id"),
    path('api/v1/games/game_date/<str:date>',views.GameViewSet.get_games_by_date, name ="get_games_by_date"),
    path('api/v1/games/home_team/team_id/<str:team_id>', views.GameViewSet.get_home_games_by_team_id, name="get_home_games_by_team_id"),
    path('api/v1/games/away_team/team_id/<str:team_id>', views.GameViewSet.get_away_games_by_team_id, name="get_away_games_by_team_id"),
    path('api/v1/games/weekly/<str:date>/team_id/<str:team>', views.GameViewSet.get_weekly_games_by_date_and_team, name="get_weekly_games_by_date_and_team"),
    path('api/v1/games/game_id/<str:game_id>',views.GameViewSet.get_game_by_id, name ="get_game_by_id"),   
    path('api/v1/teammembers/add_teammember/', views.TeamMemberViewSet.post_teammember, name='post_teammember'),
    path('api/v1/teammembers/github_username/<str:github_username>', views.TeamMemberViewSet.get_teammembers_by_github_username, name="get_teammembers_by_github_username"),
    path('api/v1/teammembers/update_git_stats', views.TeamMemberViewSet.update_git_stats, name='update_git_stats'),
    path('api/v1/weather/current_weather/team_id/<str:team_id>', views.get_current_weather_by_team_id, name="get_current_weather_by_team_id"),
    path('api/v1/teamrecords/team_id/<str:team_id>', views.TeamRecordViewSet.get_records_by_team_id, name='get_records_by_team_id'),
    path('api/v1/teamrecords/season/<str:season>', views.TeamRecordViewSet.get_records_by_season, name='get_records_by_season'),
    path('api/v1/teamrecords/team_id_and_season/<str:team_id_and_season>', views.TeamRecordViewSet.get_records_by_team_id_and_season, name='get_records_by_team_id_and_season'),
    path('api/v1/pitcherstats/player_id/<str:player_id>', views.PitcherStatsViewSet.get_pitcher_stats_by_player_id, name='get_pitcher_stats_by_player_id'),
    path('api/v1/hitterstats/player_id/<str:player_id>', views.HitterStatsViewSet.get_hitter_stats_by_player_id, name='get_hitter_stats_by_player_id'),
    path('api/v1/boxscores/boxscore_id/<str:boxscore_id>', views.BoxScoreViewSet.get_boxscore_by_id, name='get_boxscore_by_id'),
    path('api/v1/games/game_id/<str:game_id>/prediction/<str:team_side>', views.GameViewSet.post_prediction, name="post_prediction"),
    path('api/v1/games/away_team/<str:away_team>/home_team/<str:home_team>/date/<str:date>',views.GameViewSet.get_games_by_teams_and_date, name="get_games_by_teams_and_date")
    
]
