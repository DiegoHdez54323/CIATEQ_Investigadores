# Generated by Django 5.1.7 on 2025-04-25 00:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("gestion", "0004_remove_investigador_departamento"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="investigador",
            name="avatar_url",
        ),
        migrations.AddField(
            model_name="investigador",
            name="avatar",
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
