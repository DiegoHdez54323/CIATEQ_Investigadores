from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from gestion.models import DetProy
from gestion.serializers import DetProySerializer


class DetProyViewSet(viewsets.ModelViewSet):
    queryset = DetProy.objects.all()
    serializer_class = DetProySerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]

    filterset_fields = ["investigador", "proyecto", "es_principal"]

    ordering_fields = ["id", "investigador", "proyecto", "es_principal"]
    ordering = ["id"]
