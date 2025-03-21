from rest_framework import viewsets
from gestion.models import DetHerr
from gestion.serializers import DetHerrSerializer


class DetHerrViewSet(viewsets.ModelViewSet):

    queryset = DetHerr.objects.all()
    serializer_class = DetHerrSerializer
