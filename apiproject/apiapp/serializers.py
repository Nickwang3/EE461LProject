from django.contrib.auth.models import User
from .models import Team, Player, Game, TeamMember, TeamRecord, PitcherStats, HitterStats
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['team_id', 'name', 'venue', 'division','logo', 'latitude', 'longitude']

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['player_id', 'name', 'number', 'position', 'height', 'weight', 'birthdate', 'age', 'team', 'picture']

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['game_id', 'home_team', 'away_team', 'home_score','away_score','game_date','current_inning','finished']

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['github_username','name','description','avatar','issues','commits','tests']

class TeamRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamRecord
        fields = ['team_id_and_season', 'team', 'season', 'wins', 'losses','division_rank', 'league_rank']

class PitcherStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PitcherStats
        fields = ['player_id_and_season', 'team', 'player', 'season', 'games_played', 'games_started', 'wins', 'losses', 'era', 'games_finished', 'complete_games', 'shutouts', 'saves', 'innings_pitched', 'hits', 'runs', 'earned_runs', 'home_runs', 'home_runs', 'walks', 'strikeouts', 'whip']

class HitterStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = HitterStats
        fields = ['player_id_and_season', 'team', 'player', 'season', 'games', 'plate_appearances', 'at_bats', 'runs', 'hits', 'doubles', 'triples', 'home_runs', 'runs_batted_in', 'stolen_bases', 'caught_stealing', 'strikeouts', 'batting_average', 'obp', 'slg', 'ops']
