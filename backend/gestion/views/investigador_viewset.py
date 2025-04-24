from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters
from gestion.models import Investigador
from gestion.serializers import InvestigadorSerializer
from django.db.models import Count


class InvestigadorViewSet(viewsets.ModelViewSet):
    queryset = Investigador.objects.annotate(
        articles_count=Count("detart"),  # relación DetArt.investigador
        projects_count=Count("detproy"),  # relación DetProy.investigador
        students_count=Count("estudiante"),  # relación Estudiante.investigador
        events_count=Count("deteventos"),  # relación DetEventos.investigador
    )
    serializer_class = InvestigadorSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]

    ordering_fields = ["id", "sueldo"]
    ordering = ["id"]
