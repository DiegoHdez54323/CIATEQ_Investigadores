from rest_framework import viewsets
from gestion.models import TipoEvento
from gestion.serializers import TipoEventoSerializer


class TipoEventoViewSet(viewsets.ModelViewSet):
    queryset = TipoEvento.objects.all()
    serializer_class = TipoEventoSerializer
