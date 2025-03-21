from rest_framework import serializers
from gestion.models import DetLineas


class DetLineasSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetLineas
        fields = "__all__"
