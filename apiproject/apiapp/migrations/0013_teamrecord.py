# Generated by Django 3.0.3 on 2020-03-26 19:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('apiapp', '0012_auto_20200326_1801'),
    ]

    operations = [
        migrations.CreateModel(
            name='TeamRecord',
            fields=[
                ('team_id_and_season', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('season', models.CharField(max_length=20)),
                ('wins', models.CharField(max_length=5)),
                ('losses', models.CharField(max_length=5)),
                ('division_rank', models.CharField(max_length=10)),
                ('league_rank', models.CharField(max_length=10)),
                ('team_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apiapp.Team')),
            ],
        ),
    ]
