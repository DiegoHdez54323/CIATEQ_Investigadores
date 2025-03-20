from rest_framework import viewsets
from gestion.models import Snii
from gestion.serializers import SniiSerializer


class SniiViewSet(viewsets.ModelViewSet):
    queryset = Snii.objects.all()
    serializer_class = SniiSerializer
