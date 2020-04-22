import requests
import json
import statsapi
from apiapp.models import Game, Team
from django.conf import settings
from django.core.management.base import BaseCommand

class Command(BaseCommand):

    help = 'grabs player info from statsapi'
    def handle(self, *args, **options):

        sched = statsapi.schedule(start_date='01/01/2020',end_date='12/31/2020')

        for game in sched:

            try:
                game_id = game['game_id']
                home_team = Team.objects.get(team_id=game['home_id'])
                away_team = Team.objects.get(team_id=game['away_id'])
                # print("teams gotten")
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
                game_datetime = game['game_datetime']

                try:
                    db_game = Game.objects.get(game_id=game_id)

                    # if not(finished):
                    db_game.home_team = home_team
                    db_game.away_team = away_team
                    db_game.home_score = home_score 
                    db_game.away_score = away_score    
                    db_game.current_inning = current_inning   
                    db_game.save(update_fields=['home_team','away_team','home_score','away_score','current_inning'])
                    print("updated successfully")
                except:
                    db_game = Game(game_id=game_id, home_team=home_team, away_team=away_team, home_score=home_score, away_score=away_score, current_inning=current_inning, finished=finished, game_datetime=game_datetime)
                    db_game.save()
                    print("saved succesfully")
            
            # Error or team not in db
            except Team.DoesNotExist:
                print( "team not in db")
                pass
            
            