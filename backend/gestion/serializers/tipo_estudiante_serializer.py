from rest_framework import serializers
from gestion.models import TipoEstudiante


class TipoEstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoEstudiante
        fields = "__all__"
