from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from gestion.models import Estudiante
from gestion.serializers import EstudiantesSerializer


class EstudiantesViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all()
    serializer_class = EstudiantesSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]

    filterset_fields = ["investigador", "carrera", "tipo_estudiante"]

    ordering_fields = [
        "id",
        "escuela",
        "fecha_inicio",
        "fecha_termino",
        "investigador",
        "carrera",
        "tipo_estudiante",
    ]
    ordering = ["id"]
