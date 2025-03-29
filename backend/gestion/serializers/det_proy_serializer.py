from rest_framework import serializers
from gestion.models import DetProy


class DetProySerializer(serializers.ModelSerializer):
    nombre_investigador = serializers.CharField(
        source="investigador.nombre", read_only=True
    )
    nombre_proyecto = serializers.CharField(source="proyecto.nombre", read_only=True)

    class Meta:
        model = DetProy
        fields = [
            "id",
            "investigador",
            "proyecto",
            "es_principal",
            "nombre_investigador",
            "nombre_proyecto",
        ]
