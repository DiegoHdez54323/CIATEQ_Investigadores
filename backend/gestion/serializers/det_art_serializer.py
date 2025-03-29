from rest_framework import serializers
from gestion.models import DetArt


class DetArtSerializer(serializers.ModelSerializer):
    nombre_investigador = serializers.CharField(
        source="investigador.nombre", read_only=True
    )
    nombre_articulo = serializers.CharField(source="articulo.nombre", read_only=True)

    class Meta:
        model = DetArt
        fields = [
            "id",
            "investigador",
            "articulo",
            "es_principal",
            "nombre_investigador",
            "nombre_articulo",
        ]
