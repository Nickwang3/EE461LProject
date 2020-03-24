import requests, json


from django.conf import settings
from django.core.management.base import BaseCommand

class Command(BaseCommand):

    help = 'grabs player info from statsapi'
    def handle(self, *args, **options):
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

        print(user_issues)
        print(user_commits)                 