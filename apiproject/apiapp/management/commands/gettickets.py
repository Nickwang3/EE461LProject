import requests
import json
import time
import base64
from django.conf import settings
from apiapp.models import Ticket
from django.conf import settings
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'grab ticket info from seatgeek'

    def handle(self, *args, **options):
        client_id = 'MjExNDYxNTJ8MTU4NTUzMjI0Mi4xNg'
        client_secret = 'b2397740dd7c66708985882006fae5879e11235d9cc9808bc4e9c11ef87299ce'
        url = 'https://api.seatgeek.com/2/events'
        params=  {
            'q' : 'mlb',
            'client_id' : client_id,
            'client_secret' : client_secret,
            'format' : 'json',
            'per_page' : 256,
        }
        ticket_params = {
            'client_id' : client_id,
            'client_secret' : client_secret,
        }
        response = requests.get(url, params=params)
        response_json = json.loads(response.content)
        event_dict = response_json['events']
        if (event_dict):
            for event in event_dict:
                ticket_id = event['id']
                title = event['title']
                datetime_local = event['datetime_local']
                image_url = event['performers'][0]['image']
                venue = event['venue']['name']
                home_team = event['performers'][0]['name']
                away_team = event['performers'][1]['name']
                price_url = 'https://api.seatgeek.com/2/events/' + str(event['id'])
                event_resp = requests.get(price_url, params=ticket_params)
                event_json = json.loads(event_resp.content)
                price = event_json['stats']['average_price']
                event_url = event_json['url']
                if price is None:
                    average_price = 'N/A'
                else:
                    average_price = str(price)

                try:
                    ticket = Ticket.objects.get(ticket_id=ticket_id)
                    print("found")
                except:
                    ticket = Ticket(ticket_id=ticket_id, title=title, datetime_local=datetime_local, image_url=image_url, venue=venue, home_team=home_team, away_team=away_team, average_price=average_price, event_url=event_url)
                    ticket.save()
                    print('saved: ' + str(ticket_id), title, datetime_local, image_url, venue, home_team, away_team, average_price, event_url)