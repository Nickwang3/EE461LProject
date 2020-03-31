from django.test import TestCase
from apiapp.models import Team, Player, Game

class testapi(TestCase):
    def setUp(self):
        team1 = Team.objects.create(team_id='110', name = 'Baltimore Orioles')
        team2 = Team.objects.create(team_id='45', venue='Wrigley Field')
        player = Player(player_id='54', number = '27', team=team1)
        player.save()
        player2 = Player(player_id='27', weight='85kg', team=team2)
        player2.save()
        game = Game(game_id='101', home_team=team1, away_team=team2, home_score='2', away_score='4', current_inning='second', game_datetime='2020-02-23T01:10:00Z', finished=True)
        game.save()
    
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