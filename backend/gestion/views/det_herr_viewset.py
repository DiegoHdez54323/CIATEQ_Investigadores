from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from gestion.models import DetHerr
from gestion.serializers import DetHerrSerializer


class DetHerrViewSet(viewsets.ModelViewSet):
    queryset = DetHerr.objects.all()
    serializer_class = DetHerrSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]

    filterset_fields = ["proyecto", "herramienta"]

    ordering_fields = ["id", "proyecto", "herramienta"]
    ordering = ["id"]
