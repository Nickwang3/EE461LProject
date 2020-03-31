# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Team, Player, Game, TeamMember, TeamRecord, PitcherStats, HitterStats, Ticket, BoxScore

# Register your models here.
admin.site.register(Player)
admin.site.register(Team)
admin.site.register(Game)
admin.site.register(TeamMember)
admin.site.register(TeamRecord)
admin.site.register(PitcherStats)
admin.site.register(HitterStats)
admin.site.register(Ticket)
admin.site.register(BoxScore)