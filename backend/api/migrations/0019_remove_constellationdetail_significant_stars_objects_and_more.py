# Generated by Django 5.0.6 on 2024-08-01 11:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_constellationdetail'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='constellationdetail',
            name='significant_stars_objects',
        ),
        migrations.AddField(
            model_name='constellationdetail',
            name='number_of_stars',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
