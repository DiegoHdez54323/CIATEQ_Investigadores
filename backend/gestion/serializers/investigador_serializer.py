from rest_framework import serializers
from gestion.models import Investigador


class InvestigadorSerializer(serializers.ModelSerializer):
    articles_count = serializers.IntegerField(read_only=True)
    projects_count = serializers.IntegerField(read_only=True)
    students_count = serializers.IntegerField(read_only=True)
    events_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Investigador
        fields = [
            "id",
            "nombre",
            "apellido",
            "telefono",
            "correo",
            "sueldo",
            "titulo",
            "ubicacion",
            "avatar_url",
            "bio",
            "articles_count",
            "projects_count",
            "students_count",
            "events_count",
        ]
