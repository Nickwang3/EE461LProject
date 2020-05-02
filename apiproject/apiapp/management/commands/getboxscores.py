import requests
import json
import statsapi
from apiapp.models import Game, Team, BoxScore
from django.conf import settings
from django.core.management.base import BaseCommand

class Command(BaseCommand):

    help = 'grabs player info from statsapi'
    
    def handle(self, *args, **options):

        BoxScore.objects.all().delete()
        games = Game.objects.all()

        for game in games:
            try:
                home_stats = statsapi.boxscore_data(gamePk=game.game_id)['home']
                away_stats = statsapi.boxscore_data(gamePk=game.game_id)['away']

                home_batting_totals = home_stats['teamStats']['batting']
                away_batting_totals = away_stats['teamStats']['batting']

                home_pitching_totals = home_stats['teamStats']['pitching']
                away_pitching_totals = away_stats['teamStats']['pitching']
                
                home_pitchers = home_stats['pitchers']
                away_pitchers = away_stats['pitchers']

                home_hitters = home_stats['batters']
                away_hitters = away_stats['batters']

                home_player_pitching = {}
                for p_id in home_pitchers:
                    home_player_pitching.update({p_id: home_stats['players']['ID' + str(p_id)]})

                away_player_pitching = {}
                for p_id in away_pitchers:
                    away_player_pitching.update({p_id: away_stats['players']['ID' + str(p_id)]})

                home_player_hitting = {}
                for p_id in home_hitters:
                    home_player_hitting.update({p_id: home_stats['players']['ID' + str(p_id)]})

                away_player_hitting = {}
                for p_id in away_hitters:
                    away_player_hitting.update({p_id: away_stats['players']['ID' + str(p_id)]})

                boxscore = BoxScore(game=game, boxscore_id=game.game_id, home_hitting_totals=home_batting_totals, away_hitting_totals=away_batting_totals, home_pitching_totals=home_pitching_totals, away_pitching_totals=away_pitching_totals, 
                                    home_player_hitting=home_player_hitting, away_player_hitting=away_player_hitting, home_player_pitching=home_player_pitching, away_player_pitching=away_player_pitching)                
                boxscore.save()
                print("Success")
            except:
                print("failed")
        
            