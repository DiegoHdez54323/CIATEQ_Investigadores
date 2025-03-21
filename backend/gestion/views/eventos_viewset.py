from rest_framework import viewsets
from gestion.models import Eventos
from gestion.serializers import EventosSerializer


class EventosViewSet(viewsets.ModelViewSet):
    queryset = Eventos.objects.all()
    serializer_class = EventosSerializer
