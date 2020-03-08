# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from rest_framework import viewsets
from rest_framework.response import Response
from apiapp.serializers import *
from rest_framework.decorators import api_view

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):

    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.all()

class PlayerViewSet(viewsets.ModelViewSet):

    serializer_class = PlayerSerializer

    def get_queryset(self):
        return Player.objects.all().order_by('player_id')

class TeamViewSet(viewsets.ModelViewSet):

    serializer_class = TeamSerializer

    def get_queryset(self):
        return Team.objects.all().order_by('team_id')

class GameViewSet(viewsets.ModelViewSet):
    serializer_class = GameSerializer

    def get_queryset(self):
        return Game.objects.all()


@api_view(['GET'])
def get_players_by_team_id(request, team_id):
    player = Player.objects.filter(team=team_id)
    data = PlayerSerializer(player, many=True).data
    return Response(data)

@api_view(['GET'])
def get_team_by_team_id(request, team_id):  
    team = Team.objects.get(team_id=team_id)
    data = TeamSerializer(team, many=False).data
    return Response(data)

@api_view(['GET'])
def get_book_by_isbn(request, isbn):
    book = Book.objects.get(isbn=isbn)
    data = BookSerializer(book).data
    return Response(data)

@api_view(['GET'])
def get_games_by_date(request, date):
    game = Game.objects.get(game_date = date)
    data = GameSerializer(game).data
    return Response(data)


def redirect_to_api(request):
    return redirect('/api/v1')
