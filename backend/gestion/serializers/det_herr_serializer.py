from rest_framework import serializers
from gestion.models import DetHerr


class DetHerrSerializer(serializers.ModelSerializer):
    nombre_proyecto = serializers.CharField(source="proyecto.nombre", read_only=True)
    descripcion_herramienta = serializers.CharField(
        source="herramienta.descripcion", read_only=True
    )

    class Meta:
        model = DetHerr
        fields = [
            "id",
            "proyecto",
            "herramienta",
            "nombre_proyecto",
            "descripcion_herramienta",
        ]
