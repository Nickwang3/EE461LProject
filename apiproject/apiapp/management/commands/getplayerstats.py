import requests
import json
import time
import statsapi
from apiapp.models import Player
from django.conf import settings
from django.core.management.base import BaseCommand

class Command(BaseCommand):

    def handle(self, *args, **options):

        players = Player.objects.all()

        for player in players:

            if ("P" in player.position):
                group = "pitching"
                print(player, " - Pitcher")
            else:
                group = "hitting"
                print(player, " - Hitter")

            stats = statsapi.player_stat_data(personId=player.player_id, group=group, type='yearByYearAdvanced')
            start_season = int(stats['mlb_debut'].split("-")[0])

            season = start_season
            for player_season in stats['stats']:
                season += 1

                print(player_season['stats'].keys())
            
