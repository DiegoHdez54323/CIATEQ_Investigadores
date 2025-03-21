from rest_framework import serializers
from gestion.models import Articulos


class ArticulosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articulos
        fields = "__all__"
