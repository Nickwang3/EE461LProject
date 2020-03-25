from apiapp.models import TeamMember
from django.conf import settings
from django.core.management.base import BaseCommand

class Command(BaseCommand):

    def handle(self, *args, **options):

        # Input ALL OF YOUR information into these respective strings
        github_username = "aannestrand"
        name = "Andrew Annestrand"
        description = "I am currently a Junior ECE major. My tech cores are Software Design & Data Science and Information Processing."
        avatar = "../../../statics/andrew.JPG"
        tests = "0"

        # If you already exist in the database
        try: 
            print("already exist")
            you = TeamMember.objects.get(github_username=github_username)
            you.name = name
            you.description = description
            you.avatar = avatar
            you.tests = tests
            you.save(update_fields=['name','description','avatar','tests'])
            print("updated")

        # If you do not exist in database already
        except:
            print("don't exist")
            you = TeamMember(github_username=github_username, name=name, description=description, avatar=avatar, tests=tests)
            you.save()
            print("saved")