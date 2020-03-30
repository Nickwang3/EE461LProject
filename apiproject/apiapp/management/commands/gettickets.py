import requests
import json
import time
import base64
from django.conf import settings
from django.core.management.base import BaseCommand

#time.sleep(6)
client_id = 'MjExNDYxNTJ8MTU4NTUzMjI0Mi4xNg'
client_secret = 'b2397740dd7c66708985882006fae5879e11235d9cc9808bc4e9c11ef87299ce'
key = 'NLbwjVpG3kX3nUDIeAyjHCdkgMW3watH:XccAM3RF5hYKDOuH'
url = 'https://api.seatgeek.com/2/events'
params=  {
    'q' : 'baseball',
    'client_id' : client_id,
    'client_secret' : client_secret,
    'format' : 'json',
    'per_page' : 256,
}
ticket_params = {
    'client_id' : client_id,
    'client_secret' : client_secret,
}
auth_token = base64.b64encode(key.encode('utf-8')).decode()
headers = {
    'Authorization': 'Basic ' + auth_token,
    'Content-Type': 'application/json',
}
response = requests.get(url, params=params)
response_json = json.loads(response.content)
event_dict = response_json['events']
for event in event_dict:
    print(event['title'])
    price_url = 'https://api.seatgeek.com/2/events/' + str(event['id'])
    event_resp = requests.get(price_url, params=ticket_params)
    price_json = json.loads(event_resp.content)
    price = price_json['stats']['median_price']
    if price is None:
        print('cost: none')
    else:
        print('cost: $' + str(price))

"""
class Command(BaseCommand):
    help = 'grab ticket infor from seatgeek'

    def handle(self, *args, **options):
       
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
                    """