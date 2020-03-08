# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Team(models.Model):
    team_id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=50)
    venue = models.CharField(max_length=50)
    division = models.CharField(max_length=50)
    logo = models.CharField(max_length=300)

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
    home_team = models.CharField(max_length=25)
    away_team = models.CharField(max_length=25)
    home_score = models.IntegerField()
    away_score = models.IntegerField()
    finished = models.BooleanField()
    current_inning = models.CharField(max_length=30)
    game_date = models.DateTimeField()

    def __str__(self):
        return self.home_team + " v " + self.away_team


