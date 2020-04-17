# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.contrib.postgres.fields import JSONField

# Create your models here.

class Team(models.Model):
    team_id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=50)
    venue = models.CharField(max_length=50)
    division = models.CharField(max_length=50)
    logo = models.CharField(max_length=300)
    latitude = models.DecimalField(default=0, max_digits=20, decimal_places=15)
    longitude = models.DecimalField(default=0, max_digits=20, decimal_places=15)
    instagram = models.CharField(max_length=50)
    twitter = models.CharField(max_length=50)
    facebook = models.CharField(max_length=50)
    youtube_channel_id = models.CharField(max_length=100)
    video_id = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Player(models.Model):
    player_id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=100)
    number = models.CharField(max_length=2)
    position = models.CharField(max_length=30)
    height = models.CharField(max_length=30)
    weight = models.CharField(max_length=30)
    birthdate = models.CharField(max_length=50)
    age = models.CharField(max_length=5)
    team = models.ForeignKey(Team, to_field="team_id", on_delete=models.CASCADE)
    picture = models.CharField(max_length=300)

    def __str__(self):
        return self.name


class Game(models.Model):
    game_id = models.CharField(max_length=50, primary_key=True)
    home_team = models.ForeignKey(Team, to_field="team_id", on_delete=models.CASCADE, related_name='home_team')
    away_team = models.ForeignKey(Team, to_field="team_id", on_delete=models.CASCADE, related_name='away_team')
    home_score = models.IntegerField()
    away_score = models.IntegerField()
    finished = models.BooleanField()
    current_inning = models.CharField(max_length=30)
    game_datetime = models.DateTimeField()


class TeamMember(models.Model):
    github_username = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=1000)
    avatar = models.CharField(max_length=500)
    issues = models.CharField(max_length=10)
    commits = models.CharField(max_length=10)
    tests = models.CharField(max_length=10)

class TeamRecord(models.Model):
    team_id_and_season = models.CharField(max_length=50, primary_key=True)
    team = models.ForeignKey(Team, to_field="team_id", on_delete=models.CASCADE)
    season = models.CharField(max_length=20)
    wins = models.CharField(max_length=5)
    losses = models.CharField(max_length=5)
    division_rank = models.CharField(max_length=10)
    league_rank = models.CharField(max_length=10)

class PitcherStats(models.Model):
    player_id_and_season = models.CharField(max_length=50, primary_key=True)
    team = models.ForeignKey(Team, to_field="team_id", on_delete=models.CASCADE)
    player = models.ForeignKey(Player, to_field="player_id", on_delete=models.CASCADE)
    season = models.CharField(max_length=10)

    games_played = models.CharField(max_length=10)
    games_started = models.CharField(max_length=10)
    wins = models.CharField(max_length=10)
    losses = models.CharField(max_length=10)
    era = models.CharField(max_length=10)
    games_finished = models.CharField(max_length=10)
    complete_games = models.CharField(max_length=10)
    shutouts = models.CharField(max_length=10)
    saves = models.CharField(max_length=10)
    innings_pitched = models.CharField(max_length=10)
    hits = models.CharField(max_length=10)
    runs = models.CharField(max_length=10)
    earned_runs = models.CharField(max_length=10)
    home_runs = models.CharField(max_length=10)
    walks = models.CharField(max_length=10)
    strikeouts = models.CharField(max_length=10)
    whip = models.CharField(max_length=10)

class HitterStats(models.Model):
    player_id_and_season = models.CharField(max_length=50, primary_key=True)
    team = models.ForeignKey(Team, to_field="team_id", on_delete=models.CASCADE)
    player = models.ForeignKey(Player, to_field="player_id", on_delete=models.CASCADE)
    season = models.CharField(max_length=10)

    games = models.CharField(max_length=10)   
    plate_appearances = models.CharField(max_length=10)
    at_bats = models.CharField(max_length=10)
    runs = models.CharField(max_length=10)
    hits = models.CharField(max_length=10)
    doubles = models.CharField(max_length=10)
    triples = models.CharField(max_length=10)
    home_runs = models.CharField(max_length=10)
    runs_batted_in = models.CharField(max_length=10)
    stolen_bases = models.CharField(max_length=10)
    caught_stealing = models.CharField(max_length=10)
    strikeouts = models.CharField(max_length=10)
    batting_average = models.CharField(max_length=10)
    obp = models.CharField(max_length=10)
    slg = models.CharField(max_length=10)
    ops = models.CharField(max_length=10)

class Ticket(models.Model):
    ticket_id = models.CharField(max_length=50, primary_key=True)
    title = models.CharField(max_length=50)
    datetime_local = models.CharField(max_length=20)
    image_url = models.CharField(max_length=300)
    venue = models.CharField(max_length=50)
    home_team = models.CharField(max_length=50)
    away_team = models.CharField(max_length=50)
    average_price = models.CharField(max_length=10)
    event_url = models.CharField(max_length=300)

class BoxScore(models.Model):
    boxscore_id = models.CharField(max_length=50, primary_key=True)
    game = models.ForeignKey(Game, to_field='game_id', on_delete=models.CASCADE)

    home_hitting_totals = JSONField()
    away_hitting_totals = JSONField()
    home_pitching_totals = JSONField()
    away_pitching_totals = JSONField()

    home_player_hitting = JSONField()
    away_player_hitting = JSONField()
    home_player_pitching = JSONField()
    away_player_pitching = JSONField()