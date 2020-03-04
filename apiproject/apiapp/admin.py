# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Book, Author, Review, Meetup, Team, Player

# Register your models here.
admin.site.register(Book)
admin.site.register(Author)
admin.site.register(Review)
admin.site.register(Meetup)
admin.site.register(Player)
admin.site.register(Team)