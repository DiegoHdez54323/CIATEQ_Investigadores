from rest_framework import viewsets
from gestion.models import Articulos
from gestion.serializers import ArticulosSerializer


class ArticulosViewSet(viewsets.ModelViewSet):

    queryset = Articulos.objects.all()
    serializer_class = ArticulosSerializer
