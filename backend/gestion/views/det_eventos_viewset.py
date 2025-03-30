from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from gestion.models import DetEventos
from gestion.serializers import DetEventosSerializer


class DetEventosViewSet(viewsets.ModelViewSet):
    queryset = DetEventos.objects.all()
    serializer_class = DetEventosSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]

    filterset_fields = ["investigador", "evento"]

    ordering_fields = ["id", "investigador", "evento"]
    ordering = ["id"]
