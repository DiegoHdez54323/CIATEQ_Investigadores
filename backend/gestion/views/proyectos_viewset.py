from rest_framework import viewsets
from gestion.models import Proyectos
from gestion.serializers import ProyectosSerializer


class ProyectosViewSet(viewsets.ModelViewSet):
    queryset = Proyectos.objects.all()
    serializer_class = ProyectosSerializer
