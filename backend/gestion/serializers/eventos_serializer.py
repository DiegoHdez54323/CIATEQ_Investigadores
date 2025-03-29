from rest_framework import serializers
from gestion.models import Eventos


class EventosSerializer(serializers.ModelSerializer):
    tipo_evento_descripcion = serializers.CharField(
        source="tipo_evento.descripcion", read_only=True
    )

    class Meta:
        model = Eventos
        fields = [
            "id",
            "tipo_evento",
            "nombre",
            "lugar",
            "fecha",
            "duracion",
            "empresa_invita",
            "tipo_evento_descripcion",
        ]
