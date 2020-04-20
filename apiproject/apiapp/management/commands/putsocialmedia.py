from apiapp.models import Team
from django.conf import settings
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    # TeamMember.objects.get(github_username="nickwang3").delete()
    # Input ALL OF YOUR information into these respective strings
    socailmedia_dict = {
                    '108': ["https://www.instagram.com/angels/", "https://www.facebook.com/Angels/", "https://twitter.com/Angels"],
                    '109': ["https://www.instagram.com/dbacks/", "https://www.facebook.com/Dbacks/", "https://twitter.com/Dbacks"],
                    '110': ["https://www.instagram.com/orioles/", "https://www.facebook.com/Orioles/", "https://twitter.com/Orioles"],
                    '111': ["https://www.instagram.com/redsox/", "https://www.facebook.com/RedSox/", "https://twitter.com/RedSox"],
                    '112': ["https://www.instagram.com/cubs/", "https://www.facebook.com/Cubs/", "https://twitter.com/Cubs"],
                    '113': ["https://www.instagram.com/reds/", "https://www.facebook.com/Reds/", "https://twitter.com/Reds"],
                    '114': ["https://www.instagram.com/indians/", "https://www.facebook.com/Indians/", "https://twitter.com/Indians"],
                    '115': ["https://www.instagram.com/rockies/", "https://www.facebook.com/Rockies/", "https://twitter.com/Rockies"],
                    '116': ["https://www.instagram.com/tigers/", "https://www.facebook.com/Tigers/", "https://twitter.com/tigers"],
                    '117': ["https://www.instagram.com/astrosbaseball/", "https://www.facebook.com/Astros/", "https://twitter.com/astros"],
                    '118': ["https://www.instagram.com/kcroyals/", "https://www.facebook.com/Royals/", "https://twitter.com/Royals"],
                    '119': ["https://www.instagram.com/dodgers/", "https://www.facebook.com/Dodgers/", "https://twitter.com/Dodgers"],
                    '120': ["https://www.instagram.com/nationals/", "https://www.facebook.com/Nationals/", "https://twitter.com/Nationals"],
                    '121': ["https://www.instagram.com/mets/", "https://www.facebook.com/Mets/", "https://twitter.com/Mets"],
                    '133': ["https://www.instagram.com/athletics/", "https://www.facebook.com/Athletics/", "https://twitter.com/Athletics"],
                    '134': ["https://www.instagram.com/pittsburghpirates/", "https://www.facebook.com/Pirates/", "https://twitter.com/Pirates"],
                    '135': ["https://www.instagram.com/padres/", "https://www.facebook.com/Padres/", "https://twitter.com/Padres"],
                    '136': ["https://www.instagram.com/mariners/", "https://www.facebook.com/Mariners/", "https://twitter.com/Mariners"],
                    '137': ["https://www.instagram.com/sfgiants/", "https://www.facebook.com/Giants/", "https://twitter.com/SFGiants"],
                    '138': ["https://www.instagram.com/cardinals/", "https://www.facebook.com/Cardinals/", "https://twitter.com/Cardinals"],
                    '139': ["https://www.instagram.com/raysbaseball/", "https://www.facebook.com/Rays/", "https://twitter.com/RaysBaseball"],
                    '140': ["https://www.instagram.com/rangers/", "https://www.facebook.com/Rangers/", "https://twitter.com/Rangers"],
                    '141': ["https://www.instagram.com/bluejays/", "https://www.facebook.com/BlueJays/", "https://twitter.com/BlueJays"],
                    '142': ["https://www.instagram.com/twins/", "https://www.facebook.com/Twins/", "https://twitter.com/Twins"],
                    '143': ["https://www.instagram.com/phillies/", "https://www.facebook.com/Phillies/", "https://twitter.com/Phillies"],
                    '144': ["https://www.instagram.com/braves/", "https://www.facebook.com/Braves/", "https://twitter.com/Braves"],
                    '145': ["https://www.instagram.com/whitesox/", "https://www.facebook.com/WhiteSox/", "https://twitter.com/whitesox"],
                    '146': ["https://www.instagram.com/marlins/", "https://www.facebook.com/Marlins/", "https://twitter.com/Marlins"],
                    '147': ["https://www.instagram.com/yankees/", "https://www.facebook.com/Yankees/", "https://twitter.com/Yankees"],
                    '158': ["https://www.instagram.com/brewers/", "https://www.facebook.com/Brewers/", "https://twitter.com/Brewers"]}

    # If you already exist in the database
    def handle(self, *args, **options):
        for key, pair, in self.socailmedia_dict.items():
            try:
                t = Team.objects.get(team_id=key)
                t.instagram = pair[0]
                t.facebook = pair[1]
                t.twitter = pair[2]
                t.save(update_fields=['instagram','facebook','twitter'])
                print("updated:", key)

        # If you do not exist in database already
            except:
                print("failed:", key)