from rest_framework import serializers
from gestion.models import Eventos


class EventosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eventos
        fields = "__all__"
