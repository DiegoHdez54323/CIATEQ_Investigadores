from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters
from gestion.models import Investigador
from gestion.serializers import InvestigadorSerializer


class InvestigadorViewSet(viewsets.ModelViewSet):
    queryset = Investigador.objects.all()
    serializer_class = InvestigadorSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]

    ordering_fields = ["id", "sueldo"]
    ordering = ["id"]
