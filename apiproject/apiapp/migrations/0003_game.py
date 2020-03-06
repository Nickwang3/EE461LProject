# Generated by Django 3.0.3 on 2020-03-06 18:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiapp', '0002_auto_20200305_0651'),
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('game_id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('home_team', models.CharField(max_length=25)),
                ('away_team', models.CharField(max_length=25)),
                ('home_score', models.IntegerField()),
                ('away_score', models.IntegerField()),
                ('game_date', models.DateTimeField()),
            ],
        ),
    ]