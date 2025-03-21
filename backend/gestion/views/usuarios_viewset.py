from rest_framework import viewsets
from gestion.models import Usuarios
from gestion.serializers import UsuariosSerializer


class UsuariosViewSet(viewsets.ModelViewSet):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer
