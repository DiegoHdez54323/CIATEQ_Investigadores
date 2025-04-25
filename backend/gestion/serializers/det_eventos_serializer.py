from rest_framework import serializers
from gestion.models import DetEventos


class DetEventosSerializer(serializers.ModelSerializer):
    nombre_investigador = serializers.CharField(
        source="investigador.nombre", read_only=True
    )
    nombre_evento = serializers.CharField(source="evento.nombre", read_only=True)

    class Meta:
        model = DetEventos
        fields = [
            "id",
            "investigador",
            "evento",
            "nombre_investigador",
            "nombre_evento",
            "rol",
            "asunto",
        ]
