from rest_framework import viewsets
from gestion.models import DetEventos
from gestion.serializers import DetEventosSerializer


class DetEventosViewSet(viewsets.ModelViewSet):

    queryset = DetEventos.objects.all()
    serializer_class = DetEventosSerializer
