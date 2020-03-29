import requests
import json
import time
import statsapi
from apiapp.models import Game
from django.conf import settings
from django.core.management.base import BaseCommand

class Command(BaseCommand):

    def handle(self, *args, **options):
        Game.objects.all().delete()
        print("Deleted Successfully")

        sched = statsapi.schedule(start_date='01/01/2020',end_date='12/31/2020',team=143,opponent=121)
        time.sleep(6)

        for game in sched:
            game_id = game['game_id']
            home_team = game['home_name']
            away_team = game['away_name']
            home_score = game['home_score']
            away_score = game['away_score']
            current_inning = game['current_inning']
            if(('Final' in game['status']) or ('Completed' in game['status'])):
                finished = True
            else:
                finished = False
            if not(away_score):
                away_score = 0
            if not(home_score):
                home_score = 0
            if not(current_inning):
                current_inning = " "
            game_date = game['game_date']

            try:
                db_game = Game.objects.get(game_id=game_id)

                if not(finished):
                    db_game.home_score = home_score 
                    db_game.away_score = away_score    
                    db_game.current_inning = current_inning   
                    db_game.save(update_fields=['home_score','away_score','current_inning'])
            except:
                db_game = Game(game_id=game_id, home_team=home_team, away_team=away_team, home_score=home_score, away_score=away_score, current_inning=current_inning, finished=finished, game_date=game_date)
                db_game.save()

            
            



            






