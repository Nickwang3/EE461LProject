import requests
import json
from apiapp.models import Player
from django.conf import settings
from django.core.management.base import BaseCommand

class Command(BaseCommand):

    help = 'grabs player info from statsapi'
    def handle(self, *args, **options):
        url = "https://api.sportsdata.io/v3/mlb/scores/json/Players"

        # querystring = {"league":"1","season":"2020"}

        headers = {
            "Ocp-Apim-Subscription-Key": "05e50d65198f43fb82f5963440929051"
            }

        response = requests.request("GET", url, headers=headers)
        players = response.json()
        
        for player in players:
            fullName = player['FirstName'] + " " + player['LastName']

            try:
                db_player = Player.objects.get(name=fullName)
                db_player.picture = player['PhotoUrl']
                db_player.save(update_fields=['picture'])
            except:
                pass
                # print("{} not found in db".format(fullName))