# Generated by Django 3.0.3 on 2020-04-22 21:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiapp', '0006_auto_20200422_1736'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticket',
            name='away_team_name',
            field=models.CharField(default='test', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='ticket',
            name='home_team_name',
            field=models.CharField(default='test', max_length=50),
            preserve_default=False,
        ),
    ]