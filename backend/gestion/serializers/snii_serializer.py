from rest_framework import serializers
from gestion.models import Snii


class SniiSerializer(serializers.ModelSerializer):
    nombre_investigador = serializers.CharField(
        source="investigador.nombre", read_only=True
    )
    nivel_descripcion = serializers.CharField(
        source="nivel.descripcion", read_only=True
    )

    class Meta:
        model = Snii
        fields = [
            "id",
            "fecha_asignacion",
            "investigador",
            "nivel",
            "nombre_investigador",
            "nivel_descripcion",
        ]
