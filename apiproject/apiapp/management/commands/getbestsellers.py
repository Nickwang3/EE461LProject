import requests
import json
import time
from apiapp.models import Book, Author
from django.conf import settings
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'grabs and stores best seller book info from nytimes'

    def handle(self, *args, **options):
        response = dict(requests.get('https://api.nytimes.com/svc/books/v3/lists/names.json?api-key={key}'.format(key=settings.NYTIMES_API_KEY)).json())
        time.sleep(6)
        results = list(response['results'])
        genres = [dict(result)['list_name_encoded'] for result in results]
        print(genres)
        for genre in genres:
            genre_response = requests.get('https://api.nytimes.com/svc/books/v3/lists/current/{genre}.json?api-key={key}'.format(genre=genre,key=settings.NYTIMES_API_KEY))
            time.sleep(6)
            content = dict(genre_response.json())
            print(content)
            results = dict(content['results'])
            try:
                books = list(results['books'])
            except:
                continue
            for element in books:
                book = dict(element)
                title = book['title']
                isbn = book['primary_isbn13']
                author_name = book['author'].split(" ")
                first_name = author_name[0]
                last_name = author_name[-1]

                try:
                    author = Author.objects.get(first_name=first_name, last_name=last_name)
                except:
                    author = Author(last_name=last_name, first_name=first_name)
                    author.save()
                try:
                    book = Book.objects.get(isbn=isbn)
                except:
                    book = Book(title=title, isbn=isbn, author=author)
                    book.save()
