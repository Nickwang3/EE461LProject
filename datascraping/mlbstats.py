import statsapi

teams = statsapi.get('teams', {'sportIds': 1, 'activeStatus':'Yes' })['teams']

# for team in teams:
#     print(team)
#     print(team.keys())

players = statsapi.get('sports_players', {'activeStatus': 'Yes', 'season':'2019'})['people']

# for player in players:
#     print(player)
#     print(player.keys())