from django.contrib.auth.models import User
from .models import Author, Book, Review, Meetup
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

class AuthorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Author
        fields = ['first_name', 'last_name']

class BookSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Book
        fields = ['title', 'isbn', 'author']

class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        models = Review
        fields = ['title', 'body', 'book', 'user']

class MeetupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        models = Meetup
        fields = ['name', 'location', 'date', 'users']