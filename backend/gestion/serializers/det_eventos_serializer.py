from rest_framework import serializers
from gestion.models import DetEventos


class DetEventosSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetEventos
        fields = "__all__"
