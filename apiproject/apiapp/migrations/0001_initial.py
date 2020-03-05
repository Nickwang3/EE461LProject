# Generated by Django 3.0.3 on 2020-03-05 06:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('isbn', models.CharField(max_length=13)),
                ('author_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apiapp.Author')),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('team_id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('venue', models.CharField(max_length=50)),
                ('division', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('body', models.TextField()),
                ('book_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apiapp.Book')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('player_id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('number', models.CharField(max_length=2)),
                ('position', models.CharField(max_length=30)),
                ('height', models.CharField(max_length=30)),
                ('weight', models.CharField(max_length=30)),
                ('birthdate', models.CharField(max_length=50)),
                ('age', models.CharField(max_length=5)),
                ('team_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apiapp.Team')),
            ],
        ),
        migrations.CreateModel(
            name='Meetup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('location', models.CharField(max_length=50)),
                ('date', models.DateTimeField()),
                ('user_ids', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
