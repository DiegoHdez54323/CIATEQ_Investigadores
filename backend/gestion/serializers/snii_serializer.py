from rest_framework import serializers
from gestion.models import Snii


class SniiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snii
        fields = "__all__"
