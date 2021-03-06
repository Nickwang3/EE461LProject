# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import requests, json
from http import HTTPStatus
from django.db.models import Q
from django.shortcuts import render, redirect
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from apiapp.serializers import *
from rest_framework.decorators import api_view
from .models import TeamMember
from rest_framework import filters, pagination
from youtube_api import YouTubeDataAPI
from django.utils.dateparse import parse_date
from django.db.models import F

CONTRIBUTORS = "https://api.github.com/repos/Nickwang3/EE461LProject/stats/contributors"
ISSUES = "https://api.github.com/repos/Nickwang3/EE461LProject/issues"
WEATHER = "https://api.darksky.net/forecast/b411dfcc671baccec4d3b9e75d42ed21"


# For customm filtering options
class DynamicSearchFilter(filters.SearchFilter):
    def get_search_fields(self, view, request):
        return request.GET.getlist('search_fields', [])


class TeamResultsPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10


class UserViewSet(viewsets.ModelViewSet):

    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.all()


class PlayerViewSet(viewsets.ModelViewSet):
    filter_backends = [DynamicSearchFilter, filters.OrderingFilter]
    serializer_class = PlayerSerializer
    queryset = Player.objects.all().order_by('player_id')

    @api_view(['GET'])
    def get_players_by_team_id(request, team_id):
        player = Player.objects.filter(team=team_id)
        data = PlayerSerializer(player, many=True).data
        return Response(data)


class TeamViewSet(viewsets.ModelViewSet):
    pagination_class = TeamResultsPagination
    filter_backends = [DynamicSearchFilter, filters.OrderingFilter]
    serializer_class = TeamSerializer
    queryset = Team.objects.all().order_by('team_id')

    @api_view(['GET'])
    def get_team_by_team_id(request, team_id):  
        team = Team.objects.get(team_id=team_id)
        data = TeamSerializer(team, many=False).data
        return Response(data)

    @api_view(['GET'])
    def get_team_by_name(request,team_name):
        selected_team = Team.objects.get(name = team_name.replace('%20',' '))
        data = TeamSerializer(selected_team).data
        return Response(data)


class GameViewSet(viewsets.ModelViewSet):
    filter_backends = [DynamicSearchFilter, filters.OrderingFilter]
    serializer_class = GameSerializer
    queryset = Game.objects.all().order_by('game_datetime')

    @api_view(['GET'])
    def get_game_by_id(request, game_id):
        boxscore = Game.objects.get(game_id=game_id)
        data = GameSerializer(boxscore).data
        return Response(data)

    @api_view(['GET'])
    def get_games_by_teams_and_date(request,away_team,home_team,date):
        game = Game.objects.get(away_team=away_team,home_team=home_team,game_datetime__contains=parse_date(date))
        data = GameSerializer(game).data
        return Response(data)

    @api_view(['GET'])
    def get_home_games_by_team_id(request, team_id):
        games = Game.objects.filter(home_team=team_id).order_by('game_datetime')
        data = GameSerializer(games, many=True).data
        return Response(data)

    @api_view(['GET'])
    def get_away_games_by_team_id(request, team_id):
        games = Game.objects.filter(away_team=team_id).order_by('game_datetime')
        data = GameSerializer(games, many=True).data
        return Response(data)

    @api_view(['GET'])
    def get_games_by_date(request, date):
        game = Game.objects.filter(game_datetime__icontains=date).order_by("game_datetime")
        data = GameSerializer(game, many=True).data
        return Response(data)

    @api_view(['GET'])
    def get_weekly_games_by_date_and_team(request, date, team):
        games = Game.objects.none()

        for i in range(0,7):
            arr = date.split("-")
            new_day = str(int(arr[2]) + i)
            new_date = arr[0] + "-" + arr[1] + "-" + new_day
            print(new_date)
            query = Game.objects.filter(Q(home_team=team)|Q(away_team=team), game_datetime__icontains=new_date).order_by("game_datetime")
            games = games.union(query)
            print(query)

        data = GameSerializer(games, many=True).data
        return Response(data) 

    @api_view(['POST'])
    def post_prediction(request,game_id,team_side):
        if(request.method=='POST'):
            if(team_side == 'away'):
                Game.objects.filter(game_id=game_id).update(away_prediction=F('away_prediction')+ 1)
            else:
                Game.objects.filter(game_id=game_id).update(home_prediction =F('away_prediction')+ 1)

            return Response(HTTPStatus.ACCEPTED)


class TeamMemberViewSet(viewsets.ModelViewSet):
    serializer_class = TeamMemberSerializer
    queryset = TeamMember.objects.all()

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
                return Response(HTTPStatus.CREATED)
            return Response(HTTPStatus.BAD_REQUEST)

    @api_view(['PUT'])
    def update_git_stats(request):
        teammembers = TeamMember.objects.all()

        user_issues = {}
        user_commits = {}

        for teammember in teammembers:
            user_issues[teammember.github_username] = 0
            user_commits[teammember.github_username] = 0

        url = CONTRIBUTORS
        res = requests.get(url)

        for user in res.json():
            if ((user['author']['login']) in user_commits):
                user_commits[user['author']['login']] = user['total']
        
        params = {'state': 'closed'}
        url = ISSUES
        res = requests.get(url, params=params)

        for issue in res.json():
            
            assignee = issue['assignee']
            if (assignee):
                user_issues[assignee['login']] += 1

            assignees = issue['assignees']
            if (assignees):
                for assignee in assignees:
                    user_issues[assignee['login']] += 1
        
        # Now we update actual entries
        for user in user_issues.keys():
            teammember = TeamMember.objects.get(github_username=user)
            teammember.commits = user_commits[user]
            teammember.issues = user_issues[user]
            teammember.save(update_fields=['commits','issues'])
            
        return Response(HTTPStatus.ACCEPTED)


class TeamRecordViewSet(viewsets.ModelViewSet):
    serializer_class = TeamRecordSerializer
    queryset = TeamRecord.objects.all()

    @api_view(['GET'])
    def get_records_by_team_id(request, team_id):
        records= TeamRecord.objects.filter(team=team_id)
        data = TeamRecordSerializer(records, many=True).data
        return Response(data)

    @api_view(['GET'])
    def get_records_by_season(request, season):
        records = TeamRecord.objects.filter(season=season)
        data = TeamRecordSerializer(records, many=True).data
        return Response(data)

    @api_view(['GET'])
    def get_records_by_team_id_and_season(reqeust, team_id_and_season):
        record = TeamRecord.objects.get(team_id_and_season=team_id_and_season)
        data = TeamRecordSerializer(record).data
        return Response(data)


class PitcherStatsViewSet(viewsets.ModelViewSet):
    serializer_class = PitcherStatsSerializer
    queryset = PitcherStats.objects.all().order_by('season')

    @api_view(['GET'])
    def get_pitcher_stats_by_player_id(request, player_id):
        records= PitcherStats.objects.filter(player=player_id).order_by('season')
        data = PitcherStatsSerializer(records, many=True).data
        return Response(data)


class HitterStatsViewSet(viewsets.ModelViewSet):
    serializer_class = HitterStatsSerializer
    queryset = HitterStats.objects.all().order_by('season')

    @api_view(['GET'])
    def get_hitter_stats_by_player_id(request, player_id):
        records= HitterStats.objects.filter(player=player_id).order_by('season')
        data = HitterStatsSerializer(records, many=True).data
        return Response(data)


class TicketViewSet(viewsets.ModelViewSet):
    filter_backends = [DynamicSearchFilter, filters.OrderingFilter]
    serializer_class = TicketSerializer

    def get_queryset(self):
        return Ticket.objects.all().order_by('ticket_id')


class BoxScoreViewSet(viewsets.ModelViewSet):
    serializer_class = BoxScoreSerializer
    queryset = User.objects.all()

    @api_view(['GET'])
    def get_boxscore_by_id(request, boxscore_id):
        boxscore = BoxScore.objects.get(boxscore_id=boxscore_id)
        data = BoxScoreSerializer(boxscore).data
        return Response(data)


######### Weather methods #########

@api_view(['GET'])
def get_current_weather_by_team_id(request, team_id):
    team = Team.objects.get(team_id=team_id)
    url = '{}/{}, {}'.format(WEATHER, team.latitude, team.longitude)
    print(url)
    response = requests.get(url)
    return Response(response.json())

###################################



def redirect_to_api(request):
    return redirect('/api/v1')
