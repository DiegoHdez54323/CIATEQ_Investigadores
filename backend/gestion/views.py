from rest_framework import viewsets
from .models import Investigador
from .serializers import InvestigadorSerializer


class InvestigadorViewSet(viewsets.ModelViewSet):
    # API CRUD para gestionar investigadores
    queryset = Investigador.objects.all()
    serializer_class = InvestigadorSerializer
