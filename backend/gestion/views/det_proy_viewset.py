from rest_framework import viewsets
from gestion.models import DetProy
from gestion.serializers import DetProySerializer


class DetProyViewSet(viewsets.ModelViewSet):
    queryset = DetProy.objects.all()
    serializer_class = DetProySerializer
