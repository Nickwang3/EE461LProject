from apiapp.models import Player, Team
from django.conf import settings
from django.core.management.base import BaseCommand

class Command(BaseCommand):

    def handle(self, *args, **options):