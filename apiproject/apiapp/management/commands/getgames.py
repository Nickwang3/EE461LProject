import requests
import json
from apiapp.models import Game
from django.conf import settings
from django.core.management.base import BaseCommand

class Command(BaseCommand):

    help = 'grabs player info from statsapi'
    def handle(self, *args, **options):
        url = "https://api.sportsdata.io/v3/mlb/scores/json/GamesByDate/2020-MAR-06"

        headers = {
            "Ocp-Apim-Subscription-Key": "05e50d65198f43fb82f5963440929051"
            }

        response = requests.request("GET", url, headers=headers)
        games = response.json()
        print(games)