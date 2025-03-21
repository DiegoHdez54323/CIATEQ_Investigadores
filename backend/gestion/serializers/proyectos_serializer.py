from rest_framework import serializers
from gestion.models import Proyectos


class ProyectosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyectos
        fields = "__all__"
