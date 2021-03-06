import requests, json

from django.conf import settings
from django.core.management.base import BaseCommand
from apiapp.models import TeamMember

class Command(BaseCommand):

    help = 'grabs player info from statsapi'
    def insert(user_issues):
        for user in user_issues.keys():
            teammember = TeamMember.objects.get(github_username=user)
            teammember.commits = user_commits[user]
            teammember.issues = user_issues[user]
            teammember.save(update_fields=['commits','issues'])     

    def handle(self, *args, **options):
        # url = "http://django-env.zphgcpmf2t.us-west-2.elasticbeanstalk.com/api/v1/teammembers"
        # response = requests.request("GET", url)
        teammembers = TeamMember.objects.all()

        user_issues = {}
        user_commits = {}

        for teammember in teammembers:
            user_issues[teammember.github_username] = 0
            user_commits[teammember.github_username] = 0

        url = "https://api.github.com/repos/Nickwang3/EE461LProject/stats/contributors"
        res = requests.get(url)

        for user in res.json():
            if ((user['author']['login']) in user_commits):
                user_commits[user['author']['login']] = user['total']
        
        params = {'state': 'closed'}
        url = "https://api.github.com/repos/Nickwang3/EE461LProject/issues"
        res = requests.get(url, params=params)

        for issue in res.json():

            assignee = issue['assignee']
            if (assignee):
                user_issues[assignee['login']] += 1

            assignees = issue['assignees']
            if (assignees):
                for assignee in assignees:
                    user_issues[assignee['login']] += 1
        
        insert(user_issues)
        
        