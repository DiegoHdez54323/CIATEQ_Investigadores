from rest_framework import serializers
from gestion.models import Educacion


class EducacionSerializer(serializers.ModelSerializer):
    nombre_investigador = serializers.CharField(
        source="investigador.nombre", read_only=True
    )

    class Meta:
        model = Educacion
        fields = [
            "id",
            "investigador",
            "nombre_investigador",
            "grado",
            "institucion",
            "anio",
        ]
