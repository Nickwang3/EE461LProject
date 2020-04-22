import json
from django.test import TestCase
from apiapp.models import Team, Player, Game, TeamMember, PitcherStats, HitterStats, Ticket, BoxScore

class testapi(TestCase):
    def setUp(self):
        #team init
        team1 = Team.objects.create(team_id='110', name = 'Baltimore Orioles')
        team2 = Team.objects.create(team_id='45', venue='Wrigley Field')
        team1.save()
        team2.save()

        #player init
        player = Player(player_id='54', number = '27', team=team1)
        player.save()
        player2 = Player(player_id='27', weight='85kg', team=team2)
        player2.save()

        #game init
        game = Game(game_id='101', home_team=team1, away_team=team2, home_score='2', away_score='4', current_inning='second', game_datetime='2020-02-23T01:10:00Z', finished=True)
        game.save()

        #teammember init
        member1 = TeamMember(github_username='JacobMedeiros', name='Jacob', description='This is a test module', avatar='mock_url', issues='12', commits='5', tests='8')
        member1.save()

        #pitcher init
        pitcher1 = PitcherStats(team=Team.objects.get(team_id='110'), player_id_and_season='54224443', player=Player.objects.get(player_id='54'), season='2019', games_played='30', games_started='12', wins='15', losses='15', era='4.39', games_finished='0', 
                                                complete_games='0', shutouts='0', saves='12', innings_pitched='180.1', hits='149', runs='93', 
                                                earned_runs='88', home_runs='19', walks='95', strikeouts='171', whip='1.35')
        pitcher1.save()
        
        #hitter init
        hitter1 = HitterStats(team=Team.objects.get(team_id= '45'), games='261', player_id_and_season='4053687', player=Player.objects.get(player_id='27'), season='2018', plate_appearances='12', at_bats='4', runs='3', hits='5', doubles='2', triples='12',
                                             home_runs='4', runs_batted_in='15', stolen_bases='12', caught_stealing='2', strikeouts='0',
                                             batting_average='3.00', obp='.403', slg='.610', ops='1.013')
        hitter1.save()

        #ticket init
        ticket1 = Ticket(ticket_id='235', title='Baltimore Orioles at Chicago Cubs', datetime_local='2020-06-20T17:15:00', image_url='https://seatgeek.com/images/performers-landscape/oakland-athletics-5aac83/14/huge.jpg', venue='Wrigley Field', home_team='Chicago Cubs', away_team='Baltimore Orioles', average_price='104', event_url='www.reddit.com')
        ticket1.save()

        #boxscore init
        home_hitting_total = {
            "avg": ".270",
            "obp": ".352",
            "ops": ".844",
            "rbi": 3,
            "slg": ".492",
            "hits": 9,
            "runs": 3,
            "atBats": 33,
            "homeRuns": 2,
            "leftOnBase": 13,
            "strikeOuts": 9,
            "baseOnBalls": 3
        }
        home_pitching_total = {
            "era": "3.46",
            "obp": ".368",
            "rbi": 3,
            "hits": 9,
            "runs": 3,
            "atBats": 33,
            "homeRuns": 2,
            "earnedRuns": 3,
            "strikeOuts": 9,
            "baseOnBalls": 3,
            "inningsPitched": "9.0"
        }
        away_pitching_total ={
            "era": "1.50",
            "obp": ".375",
            "rbi": 3,
            "hits": 9,
            "runs": 3,
            "atBats": 33,
            "homeRuns": 1,
            "earnedRuns": 3,
            "strikeOuts": 9,
            "baseOnBalls": 6,
            "inningsPitched": "9.0"
        }
        home_player_pitching = {
            "avg": ".000",
            "obp": ".000",
            "ops": ".000"
        }
        home_player_hitting = {
            "avg": ".000",
            "obp": ".000",
            "ops": ".000"
        }
        away_player_pitching = {
            "avg": ".000",
            "obp": ".000",
            "ops": ".000"
        }
        away_player_hitting = {
            "avg": ".000",
            "obp": ".000",
            "ops": ".000"
        }
        
        boxscore1 = BoxScore(game=Game.objects.get(game_id='101'), boxscore_id='101', home_hitting_totals=json.dumps(home_hitting_total), away_hitting_totals=json.dumps(away_pitching_total), home_pitching_totals=json.dumps(home_pitching_total),
        away_pitching_totals=json.dumps(away_pitching_total), home_player_hitting=json.dumps(home_player_hitting), away_player_hitting=json.dumps(away_player_hitting), home_player_pitching=json.dumps(home_player_pitching), away_player_pitching=json.dumps(away_player_pitching))
        boxscore1.save()


    def test_find_team(self):
        balt_name = 'Baltimore Orioles'
        balt = Team.objects.get(team_id='110')
        self.assertEqual(balt.name, balt_name)
        self.assertEqual(Team.objects.get(team_id='45').venue, 'Wrigley Field')

    def test_find_player(self):
        self.assertEqual(Player.objects.get(player_id='54').number, '27')
        self.assertEqual(Player.objects.get(player_id='27').weight, '85kg')
        self.assertEqual(Player.objects.get(player_id='54').team.team_id, '110')

    def test_find_game(self):
        self.assertEqual(Game.objects.get(game_id='101').away_team.team_id, '45')
        self.assertEqual(Game.objects.get(game_id='101').home_team.name, 'Baltimore Orioles')

    def test_find_teammembers(self):
        self.assertEqual(TeamMember.objects.get(name='Jacob').commits, '5')

    def test_find_pitcherstats(self):
        self.assertEqual(PitcherStats.objects.get(player=Player.objects.get(player_id='54')).wins, '15')
        self.assertEqual(PitcherStats.objects.get(team=Team.objects.get(team_id='110')).home_runs, '19')
        self.assertEqual(PitcherStats.objects.get(player_id_and_season='54224443').saves, '12')

    def test_find_hitterstats(self):
        self.assertEqual(HitterStats.objects.get(player=Player.objects.get(player_id='27')).strikeouts, '0')
        self.assertEqual(HitterStats.objects.get(team=Team.objects.get(team_id='45')).batting_average, '3.00')
        self.assertEqual(HitterStats.objects.get(player_id_and_season='4053687').ops, '1.013')

    def test_find_tickets(self):
        self.assertEqual(Ticket.objects.get(ticket_id='235').home_team, 'Chicago Cubs')
        self.assertEqual(Ticket.objects.get(away_team='Baltimore Orioles').home_team, 'Chicago Cubs')
        
    def test_find_boxscores(self):
        home_hitting_total_data = json.loads(BoxScore.objects.get(boxscore_id='101').home_hitting_totals)
        away_hitting_total_data = json.loads(BoxScore.objects.get(boxscore_id='101').away_hitting_totals)
        home_pitching_total_data = json.loads(BoxScore.objects.get(boxscore_id='101').home_pitching_totals)
        away_pitching_total_data = json.loads(BoxScore.objects.get(boxscore_id='101').away_pitching_totals)
        
        self.assertEqual(home_hitting_total_data['runs'], 3)
        self.assertEqual(away_hitting_total_data['hits'], 9)
        self.assertEqual(home_pitching_total_data['atBats'], 33)
        self.assertEqual(away_pitching_total_data['strikeOuts'], 9)
