# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from apiapp.serializers import *
from rest_framework.decorators import api_view

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):

    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.all()

class AuthorViewSet(viewsets.ModelViewSet):

    serializer_class = AuthorSerializer

    def get_queryset(self):
        return Author.objects.all()

class BookViewSet(viewsets.ModelViewSet):

    serializer_class = BookSerializer

    def get_queryset(self):
        return Book.objects.all()


class ReviewViewSet(viewsets.ModelViewSet):
    
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.all()

class MeetupViewSet(viewsets.ModelViewSet):
  
    serializer_class = MeetupSerializer

    def get_queryset(self):
        return Meetup.objects.all()


@api_view(['GET'])
def get_book_by_isbn(request, isbn):
    book = Book.objects.get(isbn=isbn)
    data = BookSerializer(book).data
    return Response(data)


