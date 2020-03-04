import requests
import json
import time
import statsapi
from apiapp.models import Player
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
                    # print(player_id,name,number,position,height,weight,birthdate,age,team_id)

                    try: 
                        player = Player.objects.get(player_id = player_id)
                    except:
                        player = Player(player_id=player_id, name=name, number=number, position=position, height=height, weight=weight, birthdate=birthdate, age=age, team_id=team_id)
                        player.save()

                except:
                    print("not valid player")

