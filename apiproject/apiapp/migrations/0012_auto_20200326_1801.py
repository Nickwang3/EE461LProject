# Generated by Django 3.0.3 on 2020-03-26 18:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiapp', '0011_auto_20200326_1758'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='teammember',
            name='latitude',
        ),
        migrations.RemoveField(
            model_name='teammember',
            name='longitude',
        ),
        migrations.AddField(
            model_name='team',
            name='latitude',
            field=models.DecimalField(decimal_places=15, default=0, max_digits=20),
        ),
        migrations.AddField(
            model_name='team',
            name='longitude',
            field=models.DecimalField(decimal_places=15, default=0, max_digits=20),
        ),
    ]