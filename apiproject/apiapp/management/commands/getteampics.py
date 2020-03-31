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

            db_team = None
            try:
                if(team['name'] == "Boston Red Sox"):
                    db_team = Team.objects.get(name=team['name'])
                    db_team.logo = "https://www.stickpng.com/assets/images/584d49df0a44bd1070d5d480.png"
                elif (team['name'] == "Detroit Tigers"):
                    db_team = Team.objects.get(name=team['name'])
                    db_team.logo = "https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_1762000/altimages/FF_1762025ALT2_full.jpg&w=900"
                elif(team['name'] == "Pittsburgh Pirates"):
                    db_team = Team.objects.get(name=team['name'])
                    db_team.logo = "https://sportslogohistory.com/wp-content/uploads/2017/12/pittsburgh_pirates_2015-pres.png"
                elif(team['name'] == "St.Louis Cardinals"):
                    db_team = Team.objects.get(name="St. Louis Cardinals")
                    db_team.logo = "https://images.homedepot-static.com/productImages/97bab14c-58e2-46a2-9805-f26481cc5c90/svn/navy-fanmats-sports-rugs-18151-64_1000.jpg"
                elif(team['name'] == "New York Yankees"):
                    db_team = Team.objects.get(name=team['name'])
                    db_team.logo = "https://www.everythingdoormats.com/images/products/newyork-yankees-mlb-roundel-area-rug-27-inches.jpg"
                else:
                    db_team = Team.objects.get(name=team['name'])
                    db_team.logo = team['logo']
                db_team.save(update_fields=["logo"])
                print(db_team.logo)
            except:
                print(team)
                print("team not in db")