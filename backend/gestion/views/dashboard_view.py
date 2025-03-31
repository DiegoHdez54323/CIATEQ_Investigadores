from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import date
from gestion.models import Investigador, Proyectos, Articulos, Estudiante, Eventos


@api_view(["GET"])
def dashboard_data(request):
    hoy = date.today()
    anio = hoy.year
    mes = hoy.month

    data = {
        "investigadores": Investigador.objects.count(),
        "proyectos_total": Proyectos.objects.count(),
        "proyectos_este_anio": Proyectos.objects.filter(
            fecha_inicio__year=anio
        ).count(),
        "articulos_este_anio": Articulos.objects.filter(anio_publicacion=anio).count(),
        "articulos_este_mes": Articulos.objects.filter(
            fecha_publicacion__year=anio, fecha_publicacion__month=mes
        ).count(),
        "estudiantes": Estudiante.objects.count(),
        "estudiantes_terminan_este_anio": Estudiante.objects.filter(
            fecha_termino__year=anio
        ).count(),
        "eventos_total": Eventos.objects.count(),
        "eventos_proximos": Eventos.objects.filter(fecha__gte=hoy).count(),
        "eventos_este_anio": Eventos.objects.filter(fecha__year=anio).count(),
    }

    return Response(data)
