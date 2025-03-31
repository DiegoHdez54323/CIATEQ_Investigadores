from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from gestion.models import DetArt
from gestion.serializers import DetArtSerializer


class DetArtViewSet(viewsets.ModelViewSet):
    queryset = DetArt.objects.all()
    serializer_class = DetArtSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]

    filterset_fields = ["investigador", "articulo", "es_principal"]

    ordering_fields = ["id", "investigador", "articulo", "es_principal"]
    ordering = ["id"]
