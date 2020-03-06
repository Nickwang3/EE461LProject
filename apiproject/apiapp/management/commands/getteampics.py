import requests
from django.conf import settings
from django.core.management.base import BaseCommand

class Command(BaseCommand):

    help = 'grabs player info from statsapi'
    def handle(self, *args, **options):
        url = "https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=Arsenal"

        resp = requests.get(url)
        print(resp.json())