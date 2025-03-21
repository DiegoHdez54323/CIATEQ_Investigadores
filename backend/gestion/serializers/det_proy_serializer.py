from rest_framework import serializers
from gestion.models import DetProy


class DetProySerializer(serializers.ModelSerializer):
    class Meta:
        model = DetProy
        fields = "__all__"
