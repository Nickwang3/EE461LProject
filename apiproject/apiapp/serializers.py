from django.contrib.auth.models import User
from .models import Author, Book, Review, Meetup, Team, Player, Game
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['first_name', 'last_name']

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['title', 'isbn', 'author_id']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['title', 'body', 'book_id', 'user_id']

class MeetupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meetup
        fields = ['name', 'location', 'date', 'user_ids']

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['team_id', 'name', 'venue', 'division','logo']

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['player_id', 'name', 'number', 'position', 'height', 'weight', 'birthdate', 'age', 'team']

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['game_id', 'home_team', 'away_team', 'home_score','away_score','game_date']