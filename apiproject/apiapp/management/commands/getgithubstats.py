import requests, json

from django.conf import settings
from django.core.management.base import BaseCommand

class Command(BaseCommand):

    help = 'grabs player info from statsapi'
    def handle(self, *args, **options):
        url = "http://django-env.zphgcpmf2t.us-west-2.elasticbeanstalk.com/api/v1/teammembers"
        response = requests.request("GET", url)
        teammembers = response.json()['results']

        user_issues = {}
        user_commits = {}

        for teammember in teammembers:
            user_issues[teammember['github_username']] = 0
            user_commits[teammember['github_username']] = 0


        url = "https://api.github.com/repos/Nickwang3/EE461LProject/stats/contributors"
        res = requests.get(url)

        for user in res.json():
            if ((user['author']['login']) in user_commits):
                user_commits[user['author']['login']] = user['total']
        
        params = {'state': 'closed'}
        url = "https://api.github.com/repos/Nickwang3/EE461LProject/issues"
        res = requests.get(url, params=params)

        for issue in res.json():
            if (len(issue) == 23) and (issue['assignee']['login'] in user_issues):
                user_issues[issue['assignee']['login']] += 1

        print(user_issues)
        print(user_commits)                 