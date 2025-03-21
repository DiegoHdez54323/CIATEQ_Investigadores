from rest_framework import viewsets
from gestion.models import Estudiante
from gestion.serializers import EstudiantesSerializer


class EstudiantesViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all()
    serializer_class = EstudiantesSerializer
