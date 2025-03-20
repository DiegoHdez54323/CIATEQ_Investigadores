from rest_framework import serializers
from gestion.models import NivelSnii


class NivelSniiSerializer(serializers.ModelSerializer):
    class Meta:
        model = NivelSnii
        fields = "__all__"
