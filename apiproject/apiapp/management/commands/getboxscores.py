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
                away_stats = statsapi.boxscore_data(gamePk=game.game_id)['away']['teamStats']
                home_stats = statsapi.boxscore_data(gamePk=game.game_id)['home']['teamStats']

                home_runs = home_stats['batting']['runs']
                home_hits = home_stats['batting']['hits']
                home_lob = home_stats['batting']['leftOnBase']

                away_runs = away_stats['batting']['runs']
                away_hits = away_stats['batting']['hits']
                away_lob = away_stats['batting']['leftOnBase']

                # print(type(game.game_id))

                boxscore = BoxScore( game=game, home_runs=home_runs, home_hits=home_hits, home_lob=home_lob, away_runs=away_runs, away_hits=away_hits, away_lob=away_lob)
                boxscore.save()
                print("Success")
            except:
                print("failed")
        
            