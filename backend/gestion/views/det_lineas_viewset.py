from rest_framework import viewsets
from gestion.models import DetLineas
from gestion.serializers import DetLineasSerializer


class DetLineasViewSet(viewsets.ModelViewSet):

    queryset = DetLineas.objects.all()
    serializer_class = DetLineasSerializer
