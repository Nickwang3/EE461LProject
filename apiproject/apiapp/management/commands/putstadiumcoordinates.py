import requests
import json
import time
import statsapi
from apiapp.models import Team
from django.conf import settings
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'script to put coordinates into team data'

    coord_dict = {'108': [33.8003,117.8827],'109': [33.4453,112.0667],'110': [39.2839,76.6216],'111': [42.3467,71.0972], '112': [41.9484,87.6553],'113': [39.0918,-84.5040],'114': [41.4962,81.6852],'115': [39.7559,104.9942],'116': [42.3390,83.0485],'117': [29.7573,95.3555],'118': [39.0517,94.4803],
                '119': [34.0739,118.2400],'120': [38.8730,77.0074],'121': [40.7571,73.8458],'133': [37.7516,122.2005],'134': [40.4469,80.0057],'135': [32.7076,117.1570],'136': [47.5914,122.3325],'137': [37.7786,122.3893],'138': [38.6226,90.1928],'139': [27.7682,82.6534],'140': [32.7476,97.0844],'141': [43.6418, 79.3891],
                '142': [44.9818,93.2775],'143': [39.9061,75.1665],'144': [33.8907,84.4677],'145': [41.8299,87.6338],'146': [25.7778,80.2197],'147': [40.8296,73.9262],'158': [43.0280,87.9712]}

    def handle(self, *args, **options):
        for key, pair, in self.coord_dict.items():
            team = Team.objects.get(team_id=key)
            team.latitude = pair[0]
            team.longitude = pair[1]
            team.save()


