from rest_framework import viewsets
from gestion.models import DetArt
from gestion.serializers import DetArtSerializer


class DetArtViewSet(viewsets.ModelViewSet):

    queryset = DetArt.objects.all()
    serializer_class = DetArtSerializer
