import requests
import json
import time
import statsapi
from apiapp.models import Player, Team
from django.conf import settings
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'grabs player info from statsapi'

    def handle(self, *args, **options):
        players = statsapi.get('sports_players', {'activeStatus': 'Yes', 'season':'2019'})['people']
        time.sleep(6)

        if (players):
            for player in players:

                try:
                    player_id = player['id']
                    name = player['fullName']
                    number = player['primaryNumber']
                    position = player['primaryPosition']['abbreviation']
                    height = player['height']
                    weight = player['weight']
                    birthdate = player['birthDate']
                    age = player['currentAge']
                    team_id = player['currentTeam']['id']

                    try: 
                        player = Player.objects.get(player_id = player_id)
                        print("found")
                    except:
                        team = Team.objects.get(team_id=team_id)

                        player = Player(player_id=player_id, name=name, number=number, position=position, height=height, weight=weight, birthdate=birthdate, age=age, team=team)
                        player.save()
                        print("saved")
                
                except: 
                    print("bad player")



