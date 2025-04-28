from rest_framework import serializers
from gestion.models import DetMateria


class DetMateriaSerializer(serializers.ModelSerializer):
    nombre_investigador = serializers.CharField(
        source="investigador.nombre", read_only=True
    )
    nombre_materia = serializers.CharField(source="materia.nombre", read_only=True)

    class Meta:
        model = DetMateria
        fields = [
            "id",
            "investigador",
            "materia",
            "nombre_investigador",
            "nombre_materia",
        ]
