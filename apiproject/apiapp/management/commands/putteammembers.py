from apiapp.models import TeamMember
from django.conf import settings
from django.core.management.base import BaseCommand

class Command(BaseCommand):

    def handle(self, *args, **options):

        TeamMember.objects.all().delete()

        # Input ALL OF YOUR information into these respective strings
        github_username = "aannestrand"
        name = "Andrew Annestrand"
        description = "I am currently a Junior ECE major. My tech cores are Software Design & Data Science and Information Processing."
        avatar = "andrew.JPG"
        tests = "0"

        teamMember = TeamMember(github_username=github_username, name=name, description=description, avatar=avatar, tests=tests)
        teamMember.save()

        github_username = "JacobMedeiros"
        name = "Jacob Medeiros"
        description = "I'm a junior Computer Engineering major. My tech cores are Software Engineering and Academic Enrichment"
        avatar = "jacob.jpg"
        tests = "8"

        teamMember = TeamMember(github_username=github_username, name=name, description=description, avatar=avatar, tests=tests)
        teamMember.save()

        github_username = "Jombari"
        name = "Joey Tombari"
        description = "Im a 3rd year ECE major pursuing data science and software design."
        avatar = "joey.jpg"
        tests = "15"

        teamMember = TeamMember(github_username=github_username, name=name, description=description, avatar=avatar, tests=tests)
        teamMember.save()

        github_username = "Nickwang3"
        name = "Nick Wang"
        description = "I am currently a Junior in ECE with my tech cores as Software Design and Academic Enrichment."
        avatar = "nick.jpg"
        tests = "0"

        teamMember = TeamMember(github_username=github_username, name=name, description=description, avatar=avatar, tests=tests)
        teamMember.save()

        github_username = "RogerTerrazas"
        name = "Roger Terrazas"
        description = "I am a 3rd ECE major at UT Austin. My primary technical core is in Software Engineering."
        avatar = "roger.png"
        tests = "8"

        teamMember = TeamMember(github_username=github_username, name=name, description=description, avatar=avatar, tests=tests)
        teamMember.save()
        