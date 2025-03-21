from rest_framework import serializers
from gestion.models import DetHerr


class DetHerrSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetHerr
        fields = "__all__"
