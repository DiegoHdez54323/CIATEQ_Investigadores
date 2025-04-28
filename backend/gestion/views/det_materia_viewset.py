from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from gestion.models import DetMateria
from gestion.serializers import DetMateriaSerializer


class DetMateriaViewset(viewsets.ModelViewSet):
    queryset = DetMateria.objects.all()
    serializer_class = DetMateriaSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]

    filterset_fields = ["investigador", "materia"]
    ordering_fields = ["id", "investigador", "materia"]
    ordering = ["id"]
