# Generated by Django 3.0.3 on 2020-03-07 00:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiapp', '0009_auto_20200307_0040'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='current_inning',
            field=models.CharField(max_length=20),
        ),
    ]
