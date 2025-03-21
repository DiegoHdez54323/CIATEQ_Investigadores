from rest_framework import viewsets
from gestion.models import Carreras
from gestion.serializers import CarrerasSerializer


class CarrerasViewSet(viewsets.ModelViewSet):
    queryset = Carreras.objects.all()
    serializer_class = CarrerasSerializer
