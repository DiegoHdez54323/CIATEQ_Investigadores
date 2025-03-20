from rest_framework import viewsets
from rest_framework.viewsets import ReadOnlyModelViewSet
from gestion.models import NivelSnii
from gestion.serializers import NivelSniiSerializer


class NivelSniiViewSet(ReadOnlyModelViewSet):
    queryset = NivelSnii.objects.all()
    serializer_class = NivelSniiSerializer
