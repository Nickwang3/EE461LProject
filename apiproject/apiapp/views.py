# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import requests, json
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

class TeamMemberViewSet(viewsets.ModelViewSet):
    serializer_class = TeamMemberSerializer

    def get_queryset(self):
        return TeamMember.objects.all()


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

@api_view(['GET','DELETE'])
def get_teammembers_by_github_username(request, github_username):
    if (request.method == "GET"):
        print("getyfunctions")
        teammember = TeamMember.objects.filter(github_username=github_username)
        data = TeamMemberSerializer(teammember).data
        return Response(data)

    elif (request.method == "DELETE"):
        teammember = TeamMember.objects.get(github_username=github_username)
        operation = teammember.delete()
        data = {}
        if operation:
            data['success'] = "delete successful"
    
@api_view(['POST'])
def post_teammember(request):
    if (request.method == "POST"):
        serializer = TeamMemberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_git_stats(request):
    user_issues = {'aannestrand': 0, 'Nickwang3': 0, 'JacobMedeiros': 0, 'RogerTerrazas': 0, 'Jombari': 0, 'pc24495': 0}
    user_commits = {'aannestrand': 0, 'Nickwang3': 0, 'JacobMedeiros': 0, 'RogerTerrazas': 0, 'Jombari': 0, 'pc24495': 0}

    url = "https://api.github.com/repos/Nickwang3/EE461LProject/stats/contributors"
    res = requests.get(url)

    for user in res.json():
        user_commits[user['author']['login']] = user['total']
    
    params = {'state': 'closed'}
    url = "https://api.github.com/repos/Nickwang3/EE461LProject/issues"
    res = requests.get(url, params=params)

    for issue in res.json():
        if (len(issue) == 23):
            user_issues[issue['assignee']['login']] += 1
    
    # Now we update actual entries
    for user in user_issues.keys():
        teammember = TeamMember.objects.get(github_username=user)
        teammember.commits = user_commits[user]
        teammember.issues = user_issues[user]
        teammember.save(update_fields=['commits','issues'])
        
    return Response(serializer.data, status=status.HTTP_200_OK)


def redirect_to_api(request):
    return redirect('/api/v1')
