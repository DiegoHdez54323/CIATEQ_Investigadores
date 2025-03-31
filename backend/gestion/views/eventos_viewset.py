from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from gestion.models import Eventos
from gestion.serializers import EventosSerializer


class EventosViewSet(viewsets.ModelViewSet):
    queryset = Eventos.objects.all()
    serializer_class = EventosSerializer

    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]

    filterset_fields = ["tipo_evento"]

    ordering_fields = [
        "id",
        "fecha",
        "duracion",
        "tipo_evento",
        "lugar",
        "empresa_invita",
    ]
    ordering = ["id"]
