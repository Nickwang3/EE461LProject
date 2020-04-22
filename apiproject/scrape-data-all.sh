#!/bin/bash

# get teammember data
echo "adding team member commands"
python3 manage.py putteammembers
python3 manage.py getgithubstats

# get team data
echo "running team scraping commands"
python3 manage.py getteams
python3 manage.py getteampics
python3 manage.py getteamstandings
python3 manage.py putstadiumcoordinates
python3 manage.py putsocialmedia
python3 manage.py setyoutubechannel

# get player data
echo "running player scraping commands"
python3 manage.py getplayers
python3 manage.py getplayerpics
python3 manage.py getplayerstats

# get game data
echo "running game scraping commands"
python3 manage.py getgames
python3 manage.py getboxscores
python3 manage.py updatescoreswithteamnames

# get ticket data
echo "running ticket scraping commands"
python3 manage.py gettickets
