from rest_framework import serializers
from gestion.models import Estudiante


class EstudiantesSerializer(serializers.ModelSerializer):
    nombre_investigador = serializers.CharField(
        source="investigador.nombre", read_only=True
    )
    nombre_carrera = serializers.CharField(source="carrera.nombre", read_only=True)
    descripcion_tipo_estudiante = serializers.CharField(
        source="tipo_estudiante.descripcion", read_only=True
    )

    class Meta:
        model = Estudiante
        fields = [
            "id",
            "investigador",
            "carrera",
            "tipo_estudiante",
            "escuela",
            "fecha_inicio",
            "fecha_termino",
            "sueldo",
            "nombre",
            "nombre_investigador",
            "nombre_carrera",
            "descripcion_tipo_estudiante",
        ]
