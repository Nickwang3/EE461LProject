import requests
import json
from apiapp.models import Team
from django.conf import settings
from django.core.management.base import BaseCommand

class Command(BaseCommand):

    help = 'grabs player info from statsapi'
    def handle(self, *args, **options):
        url = "https://api-baseball.p.rapidapi.com/teams"

        querystring = {"league":"1","season":"2020"}

        headers = {
            'x-rapidapi-host': "api-baseball.p.rapidapi.com",
            'x-rapidapi-key': "20afef655amshcc0978cf557f629p1d0d73jsn45923fb288fa"
            }

        response = requests.request("GET", url, headers=headers, params=querystring)
        teams = response.json()['response']

        for team in teams:

            try:
                db_team = Team.objects.get(name=team['name'])
                db_team.logo = team['logo']
                db_team.save(update_fields=["logo"])
                # print(db_team.logo)
            except:
                print("team not in db")