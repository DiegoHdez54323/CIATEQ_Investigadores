from rest_framework import viewsets
from gestion.models import Herramientas
from gestion.serializers import HerramientasSerializer


class HerramientasViewSet(viewsets.ModelViewSet):

    queryset = Herramientas.objects.all()
    serializer_class = HerramientasSerializer
