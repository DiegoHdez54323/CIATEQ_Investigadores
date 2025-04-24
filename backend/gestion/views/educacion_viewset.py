from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from gestion.models import Educacion
from gestion.serializers import EducacionSerializer


class EducacionViewSet(viewsets.ModelViewSet):
    queryset = Educacion.objects.all()
    serializer_class = EducacionSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]

    filterset_fields = ["investigador"]

    ordering_fields = [
        "id",
    ]
    ordering = ["id"]
