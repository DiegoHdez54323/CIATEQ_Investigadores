from rest_framework import viewsets
from gestion.models import NivelSnii
from gestion.serializers import NivelSniiSerializer


class NivelSniiViewSet(viewsets.ModelViewSet):
    queryset = NivelSnii.objects.all()
    serializer_class = NivelSniiSerializer
