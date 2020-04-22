import requests
import json
import time
import statsapi
from apiapp.models import Game, Team
from django.conf import settings
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'update ticket models with team names'

    def handle(self, *args, **options):
        games = Game.objects.all()

        for game in games:
            # home_team_id = game.home_team
            # away_team_id = game.away_team
            # print("home_team_id: {home_team_id}, away_team_id: {away_team_id}".format(home_team_id=home_team_id, away_team_id=away_team_id))
            # home_team = Team.objects.get(team_id=home_team_id)
            # away_team = Team.objects.get(team_id=away_team_id)
            game.home_team_name = game.home_team.name
            game.away_team_name = game.away_team.name
            game.save(update_fields=['home_team_name','away_team_name'])
            print("updated scores with team names")


