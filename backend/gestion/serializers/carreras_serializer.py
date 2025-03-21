from rest_framework import serializers
from gestion.models import Carreras


class CarrerasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carreras
        fields = "__all__"
