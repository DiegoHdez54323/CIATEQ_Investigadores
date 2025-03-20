from rest_framework import viewsets
from gestion.models import Investigador
from gestion.serializers import InvestigadorSerializer


class InvestigadorViewSet(viewsets.ModelViewSet):
    # API CRUD para gestionar investigadores
    queryset = Investigador.objects.all()
    serializer_class = InvestigadorSerializer
