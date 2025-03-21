from rest_framework import viewsets
from gestion.models import TipoEstudiante
from gestion.serializers import TipoEstudianteSerializer


class TipoEstudianteViewSet(viewsets.ModelViewSet):
    queryset = TipoEstudiante.objects.all()
    serializer_class = TipoEstudianteSerializer
