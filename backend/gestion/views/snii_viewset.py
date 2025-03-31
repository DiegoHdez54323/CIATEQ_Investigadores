from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from gestion.models import Snii
from gestion.serializers import SniiSerializer


class SniiViewSet(viewsets.ModelViewSet):
    queryset = Snii.objects.all()
    serializer_class = SniiSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]

    filterset_fields = ["nivel"]

    ordering_fields = ["id", "fecha_asignacion", "nivel"]
    ordering = ["id"]
