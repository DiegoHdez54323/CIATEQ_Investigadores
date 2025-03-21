from rest_framework import viewsets
from gestion.models import Lineas
from gestion.serializers import LineasSerializer


class LineasViewSet(viewsets.ModelViewSet):
    # API CRUD para gestionar lineas
    queryset = Lineas.objects.all()
    serializer_class = LineasSerializer
