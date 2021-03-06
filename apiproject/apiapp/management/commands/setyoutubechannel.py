import requests
import json
from django.conf import settings
from django.core.management.base import BaseCommand
from apiapp.models import Team
from youtube_api import YouTubeDataAPI

class Command(BaseCommand):

    help = 'grabs player info from statsapi'
    def handle(self, *args, **options):
        # api_key = 'AIzaSyDGWOKG57mu6dWKWATDZPqlkAaozXA5P1k'
        # yt = YouTubeDataAPI(api_key)

        # print(yt.search(channel_id="UCBci3py0IfkjkjPKDE-B6Bw"))
        channel_ids = {
            '108': "UCS7H_WWPj5_qfD-zoUzuX2A",
            '109': "UCxeK534L7DDIwPFv_o9CZjw",
            '110': "UC2jqf9lgDjMUtTow1Q4IKzg",
            '111': "UCoLrny_Oky6BE206kOfTmiw",
            '112': "UCnU7B7B0U0t2vs-2HMLjgvg",
            '113': "UCENXPJrzbHXudxhURfk5NCg",
            '114': "UCpI50OSBxxalmRZRq4gtRDw",
            '115': "UCBci3py0IfkjkjPKDE-B6Bw",
            '116': "UCKKG465DFaJ3Yp-jQHA3jhw",
            '117': "UC3RPfeyaEIPosC4eIcNr4Gw",
            '118': "UCvA2SgPVi3Hw6n_WER0VrcQ",
            '119': "UC05cNJvMKzDLRPo59X2Xx7g",
            '120': "UCUnB3WNX238eraj5IK3fFEw",
            '121': "UCgIMbGazP0uBDy9JVCqBUaA",
            '133': "UCeiRABiGBQTzpuEYohN_I1Q",
            '134': "UCmBaK2wdmP1LZ9gLkkHiM4Q",
            '135': "UCdhukF6o5_ENjbf_9oNGXNQ",
            '136': "UCWWLs-O8JGYYcNea7AgumAA",
            '137': "UCpXMHgjrpnynDSV5mXpqImw",
            '138': "UCwaMqLYzbyp2IbFgcF_s5Og",
            '139': "UCZaT7TplNF541ySP8SlHVGA",
            '140': "UCZjXWMvOrhc91chSDPDUspA",
            '141': "UCVPkZh_H6m_stW8hq-2-yNw",
            '142': "UCkXEh3jSl4oB1mQqjIePfTg",
            '143': "UCWkTX0S0Ii5pT2aRVz7Zctw",
            '144': "UCNWnkblY5_kmf4OQ9l0LgnA",
            '145': "UCve-Ci-M4CkBOmNi2LQdCRg",
            '146': "UC1Gh_pQ7l41tyBn2HeJ1k-A",
            '147': "UCmAQ_4ELJodnKuNqviK86Dg",
            '158': "UCybiT6P8jSv7gIxC4cHXl2Q"
        }

        video_ids = {
            '108': "e8ze4_Oo66g",
            '109': "WlcpDVlsJjg",
            '110': "7BbFLA_ObTI",
            '111': "02QZRqfUAPE",
            '112': "ggcU0-XG4KE",
            '113': "Cc_650NlNcY",
            '114': "WT6prTV9bro",
            '115': "ONP0vh6hE2M",
            '116': "-UMYNwGIY74",
            '117': "kX19t-Ctc08",
            '118': "PMX_yYEUfBQ",
            '119': "4MM7D1PSAD0",
            '120': "8hH3ofGGdJc",
            '121': "L_d8Dzpi_yk",
            '133': "bKBMMQJBdI0",
            '134': "uku_pzuzGZM",
            '135': "NM6MwOo57F0",
            '136': "yOC33qMBAEk",
            '137': "pol8vqsR7qQ",
            '138': "P1HaLnmHjYI",
            '139': "-59C3k1Xa-M",
            '140': "TB8WE94KRHU",
            '141': "2tSu2Q4TacY",
            '142': "6Z_Vf7iqtKg",
            '143': "UsPjJPQbVjs",
            '144': "3UzW1aJXRUw",
            '145': "23AacJr1oOg",
            '146': "9HwrQhVbo1A",
            '147': "SW1yiXL_DPE",
            '158': "UnaII3HPFAo"
        }
        for key in channel_ids.keys():
            # vid_id = (yt.search(channel_id=channel_ids[key])[0]['video_id'])
            team = Team.objects.get(team_id=key)
            team.youtube_channel_id = channel_ids[key]
            team.video_id = video_ids[key]
            team.save(update_fields=['youtube_channel_id', 'video_id'])
            print("Success")
            