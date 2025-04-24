from rest_framework import serializers
from gestion.models import Educacion


class EducacionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Educacion
        fields = [
            "id",
            "investigador",
            "grado",
            "institucion",
            "anio",
        ]
