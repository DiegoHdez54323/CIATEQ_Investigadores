from rest_framework import serializers
from gestion.models import Lineas


class LineasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lineas
        fields = "__all__"
