# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2020-07-30 21:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('planner', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='finish',
            field=models.PositiveIntegerField(default=0),
            preserve_default=False,
        ),
    ]
