import requests
import json
import time
import statsapi
from apiapp.models import Player, Team, HitterStats, PitcherStats
from django.conf import settings
from django.core.management.base import BaseCommand

class Command(BaseCommand):

    def handle(self, *args, **options):

        # self.update_team()
        # # PitcherStats.objects.all().delete()
        # # HitterStats.objects.all().delete()
        players = Player.objects.all()

        for player in players:

            if ("P" in player.position):
                group = "pitching"
            else:
                group = "hitting"

            stats = statsapi.player_stat_data(personId=player.player_id, group=group, type='yearByYear')
            start_season = int(stats['mlb_debut'].split("-")[0])

            season = start_season
            for player_season in stats['stats']:
                # dummy_team = Team.objects.get(team_id=108)

                if (group == "hitting"):
                    player_id_and_season = str(player.player_id) + str(season)
                    games = player_season['stats']['gamesPlayed']   
                    hitter = HitterStats.objects.get(player_id_and_season=player_id_and_season)
                    hitter.games = games
                    hitter.save(update_fields=["games"])
                    print("Success")
                #     plate_appearances = player_season['stats']['plateAppearances']
                #     at_bats = player_season['stats']['atBats']
                #     runs = player_season['stats']['runs']
                #     hits = player_season['stats']['hits']
                #     doubles = player_season['stats']['doubles']
                #     triples = player_season['stats']['triples']
                #     home_runs = player_season['stats']['homeRuns']
                #     runs_batted_in = player_season['stats']['rbi']
                #     stolen_bases = player_season['stats']['stolenBases']
                #     caught_stealing = player_season['stats']['caughtStealing']
                #     strikeouts = player_season['stats']['strikeOuts']
                #     batting_average = player_season['stats']['avg']
                #     obp = player_season['stats']['obp']
                #     slg = player_season['stats']['slg']
                #     ops = player_season['stats']['ops']
                #     new_hitter = HitterStats(team=dummy_team, player_id_and_season=player_id_and_season, player=player, season=season, plate_appearances=plate_appearances, at_bats=at_bats, runs=runs, hits=hits, doubles=doubles, triples=triples,
                #                              home_runs=home_runs, runs_batted_in=runs_batted_in, stolen_bases=stolen_bases, caught_stealing=caught_stealing, strikeouts=strikeouts,
                #                              batting_average=batting_average, obp=obp, slg=slg, ops=ops)
                #     new_hitter.save()
                #     print("Successfully saved")

                # else:
                #     player_id_and_season = str(player.player_id) + str(season)
                #     games_played = player_season['stats']['gamesPlayed']
                #     games_started = player_season['stats']['gamesStarted']
                #     wins = player_season['stats']['wins']
                #     losses = player_season['stats']['losses']
                #     era = player_season['stats']['era']
                #     games_finished = player_season['stats']['gamesFinished']
                #     complete_games = player_season['stats']['completeGames']
                #     shutouts = player_season['stats']['shutouts']
                #     saves = player_season['stats']['saves']
                #     innings_pitched = player_season['stats']['inningsPitched']
                #     hits = player_season['stats']['hits']
                #     runs = player_season['stats']['runs']
                #     earned_runs = player_season['stats']['earnedRuns']
                #     home_runs = player_season['stats']['homeRuns']
                #     walks = player_season['stats']['baseOnBalls']
                #     strikeouts = player_season['stats']['strikeOuts']
                #     whip = player_season['stats']['whip']
                #     new_pitcher = PitcherStats(team=dummy_team, player_id_and_season=player_id_and_season, player=player, season=season, games_played=games_played, games_started=games_started, wins=wins, losses=losses, era=era, games_finished=games_finished, 
                #                                 complete_games=complete_games, shutouts=shutouts, saves=saves, innings_pitched=innings_pitched, hits=hits, runs=runs, 
                #                                 earned_runs=earned_runs, home_runs=home_runs, walks=walks, strikeouts=strikeouts, whip=whip)
                #     new_pitcher.save()
                #     print("Successfully Saved")
                season +=1

    def update_team(self):

        seasons = list(range(1995,2021))
        for season in seasons:
             season_players = statsapi.get('sports_players', {'sportId': 1, 'season': season})['people']

             for player in season_players:

                if ("P" in player['primaryPosition']['abbreviation']):
                    # Look to see if player exists in our db
                    try:
                        pitcher = PitcherStats(player_id_and_season=(str(player['id'])+ str(season)))
                        team = Team.objects.get(team_id=str(player['currentTeam']['id']))
                        pitcher.team = team
                        pitcher.save(update_fields=['team'])
                        print("Updated")
                    except:
                        print("Player not in our active list", str(player['id'])+ str(season))
                else:
                    # Look to see if player exists in our db
                    try:
                        hitter = HitterStats(player_id_and_season=(str(player['id'])+ str(season)))
                        team = Team.objects.get(team_id=str(player['currentTeam']['id']))
                        hitter.team = team
                        hitter.save(update_fields=['team'])
                        print("Updated")
                    except:
                        print("Player not in our active list", type(str(player['id'])+ str(season)))            
