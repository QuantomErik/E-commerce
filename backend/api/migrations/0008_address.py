# Generated by Django 5.0.6 on 2024-07-23 11:12

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_product_price'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address_type', models.CharField(max_length=255)),
                ('country', models.CharField(max_length=255)),
                ('full_name', models.CharField(max_length=255)),
                ('phone_number', models.CharField(max_length=20)),
                ('street_address', models.TextField()),
                ('postcode', models.CharField(max_length=20)),
                ('city', models.CharField(max_length=255)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
