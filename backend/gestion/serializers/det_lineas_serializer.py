from rest_framework import serializers
from gestion.models import DetLineas


class DetLineasSerializer(serializers.ModelSerializer):
    nombre_investigador = serializers.CharField(
        source="investigador.nombre", read_only=True
    )
    descripcion_linea = serializers.CharField(
        source="linea.descripcion", read_only=True
    )

    class Meta:
        model = DetLineas
        fields = [
            "id",
            "investigador",
            "linea",
            "reconocido",
            "nombre_investigador",
            "descripcion_linea",
        ]
