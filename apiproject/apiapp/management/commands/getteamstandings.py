import requests
import json
import time
import statsapi
from apiapp.models import TeamRecord, Team
from django.conf import settings
from django.core.management.base import BaseCommand

class Command(BaseCommand):

    def handle(self, *args, **options):

        season = '2018'
        
        al_standings = statsapi.get('standings', {'sportIds': 1, 'leagueId': 103, 'season':season})
        nl_standings = statsapi.get('standings', {'sportIds': 1, 'leagueId': 104, 'season':season})
        
        for division in al_standings['records']:
            for team in division['teamRecords']:
                team_id_and_season = str(team['team']['id']) + (season)
                team_id = team['team']['id']
                wins = team['wins']
                losses = team['losses']
                division_rank = team['divisionRank']
                league_rank = team['leagueRank']

                team = Team.objects.get(team_id=team_id)

                record = TeamRecord(team_id_and_season=team_id_and_season, team=team, season=season, wins=wins, losses=losses, division_rank=division_rank, league_rank=league_rank)
                record.save()
                print("Saved Successfully")

        for division in nl_standings['records']:
            for team in division['teamRecords']:
                team_id_and_season = str(team['team']['id']) + (season)
                team_id = team['team']['id']
                wins = team['wins']
                losses = team['losses']
                division_rank = team['divisionRank']
                league_rank = team['leagueRank']

                team = Team.objects.get(team_id=team_id)

                record = TeamRecord(team_id_and_season=team_id_and_season, team=team, season=season, wins=wins, losses=losses, division_rank=division_rank, league_rank=league_rank)
                record.save()
                print("Saved Successfully")