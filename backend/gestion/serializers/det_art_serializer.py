from rest_framework import serializers
from gestion.models import DetArt


class DetArtSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetArt
        fields = "__all__"
