import requests
import json
import time
import statsapi
from apiapp.models import Team
from django.conf import settings
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'grabs team info from statsapi'
    def insert(teams):
        if (teams):
            for team in teams:
                team_id = team['id']
                name = team['name']
                venue = team['venue']['name']
                division = team['division']['name']

                try:
                    team = Team.objects.get(team_id=team_id)
                    print("found")
                except:
                    team = Team(team_id=team_id, name=name, venue=venue, division=division)
                    team.save()
                    print(team_id,name,venue,division)

    def handle(self, *args, **options):
        teams = statsapi.get('teams', {'sportIds': 1, 'activeStatus':'Yes' })['teams']
        time.sleep(6)
