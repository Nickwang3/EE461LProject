import requests
import json
import time
import statsapi
from apiapp.models import Game
from django.conf import settings
from django.core.management.base import BaseCommand

class Command(BaseCommand):

    def handle(self, *args, **options):
        Game.objects.all().delete()
        print("Deleted Successfully")