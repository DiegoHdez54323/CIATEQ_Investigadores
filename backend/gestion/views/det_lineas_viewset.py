from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from gestion.models import DetLineas
from gestion.serializers import DetLineasSerializer


class DetLineasViewSet(viewsets.ModelViewSet):
    queryset = DetLineas.objects.all()
    serializer_class = DetLineasSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]

    filterset_fields = ["investigador", "linea"]

    ordering_fields = ["investigador", "linea", "id"]
    ordering = ["id"]
