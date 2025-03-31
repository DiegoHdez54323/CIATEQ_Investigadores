from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from gestion.models import Articulos
from gestion.serializers import ArticulosSerializer


class ArticulosViewSet(viewsets.ModelViewSet):
    queryset = Articulos.objects.all()
    serializer_class = ArticulosSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]

    ordering_fields = [
        "id",
        "fecha_publicacion",
        "nombre_revista",
        "pais_publicacion",
        "anio_publicacion",
    ]

    ordering = ["id"]
