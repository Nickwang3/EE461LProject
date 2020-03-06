# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Author(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    def __str__(self):
        return "{last_name}, {first_name}".format(last_name=self.last_name, first_name=self.first_name)

class Book(models.Model):
    title = models.CharField(max_length=100)
    isbn = models.CharField(max_length=13)
    author_id = models.ForeignKey(Author, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Review(models.Model):
    title = models.CharField(max_length=50)
    body = models.TextField()
    book_id = models.ForeignKey(Book, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Meetup(models.Model):
    name = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    date = models.DateTimeField()
    user_ids = models.ManyToManyField(User)

    def __str__(self):
        return self.name

class Team(models.Model):
    team_id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=50)
    venue = models.CharField(max_length=50)
    division = models.CharField(max_length=50)
    # picture = models.ImageField()

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
    # picture = models.ImageField()

    def __str__(self):
        return self.name


class Score(models.Model):
    game_id = models.CharField(max_length=50, primary_key=True)
    home_team = models.CharField(max_length=30)
    away_team = models.CharField(max_length=30)
    home_score = models.IntegerField()
    away_score = models.IntegerField()
    game_date = models.DateTimeField()
    inning_1H = models.IntegerField()
    inning_2H = models.IntegerField()
    inning_3H = models.IntegerField()
    inning_4H = models.IntegerField()
    inning_5H = models.IntegerField()
    inning_6H = models.IntegerField()
    inning_7H = models.IntegerField()
    inning_8H = models.IntegerField()
    inning_9H = models.IntegerField()
    inning_OTH = models.IntegerField()
    inning_1A = models.IntegerField()
    inning_2A = models.IntegerField()
    inning_3A = models.IntegerField()
    inning_4A = models.IntegerField()
    inning_5A = models.IntegerField()
    inning_6A = models.IntegerField()
    inning_7A = models.IntegerField()
    inning_8A = models.IntegerField()
    inning_9A = models.IntegerField()
    inning_OTA = models.IntegerField()

    def __str__(self):
        return self.home_team + " v " + self.away_team


