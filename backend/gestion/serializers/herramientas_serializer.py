from rest_framework import serializers
from gestion.models import Herramientas


class HerramientasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Herramientas
        fields = "__all__"
