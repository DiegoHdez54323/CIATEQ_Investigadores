# Generated by Django 5.1.7 on 2025-04-24 18:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("gestion", "0002_alter_estudiante_sueldo"),
    ]

    operations = [
        migrations.AddField(
            model_name="articulos",
            name="citados",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="articulos",
            name="resumen",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="deteventos",
            name="asunto",
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name="deteventos",
            name="rol",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="estudiante",
            name="status",
            field=models.CharField(
                choices=[
                    ("Activo", "Activo"),
                    ("Abandonó", "Abandonó"),
                    ("Graduado", "Graduado"),
                ],
                default="Active",
                max_length=50,
            ),
        ),
        migrations.AddField(
            model_name="investigador",
            name="avatar_url",
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="investigador",
            name="bio",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="investigador",
            name="departamento",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="investigador",
            name="titulo",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="investigador",
            name="ubicacion",
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name="proyectos",
            name="descripcion",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="proyectos",
            name="status",
            field=models.CharField(
                choices=[
                    ("Pendiente", "Pendiente"),
                    ("Activo", "Activo"),
                    ("Pausado", "Pausado"),
                    ("Completado", "Completado"),
                    ("Cancelado", "Cancelado"),
                ],
                default="Pending",
                max_length=10,
            ),
        ),
        migrations.CreateModel(
            name="Educacion",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("grado", models.CharField(max_length=200)),
                ("institucion", models.CharField(max_length=200)),
                ("anio", models.IntegerField()),
                (
                    "investigador",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="educacion",
                        to="gestion.investigador",
                    ),
                ),
            ],
            options={
                "db_table": "educacion",
            },
        ),
    ]
