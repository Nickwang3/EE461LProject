# Generated by Django 3.0.3 on 2020-03-04 22:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiapp', '0007_auto_20200304_2242'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='team_id',
            field=models.CharField(max_length=50),
        ),
    ]
