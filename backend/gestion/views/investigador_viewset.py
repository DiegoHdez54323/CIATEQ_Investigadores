from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters
from gestion.models import Investigador
from gestion.serializers import InvestigadorSerializer
from django.db.models import Count

from rest_framework.decorators import action
from rest_framework.response import Response


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

    @action(detail=True, methods=["get"])
    def score(self, request, pk=None):
        inv = self.get_object()

        # Diccionarios de mapeo
        mapping_est_maestria = {
            "Activo": 1,
            "Abandonó": 2,
            "Egresado": 3,
            "Titulado": 5,
        }
        mapping_est_doctorado = {
            "Activo": 1,
            "Abandonó": 3,
            "Egresado": 5,
            "Titulado": 8,
        }
        mapping_proyectos = {
            "Proceso": 3,
            "Terminado": 7,
            "Instalado": 10,
        }
        mapping_articulos_principal = {
            "EnProceso": 3,
            "Terminado": 5,
            "Aceptado": 7,
            "Publicado": 10,
        }
        mapping_eventos = {
            "Congreso": 3,
            "Taller": 1,
            "Conferencia": 5,
            "Diplomado": 3,
            "Charla": 1,
        }

        # ——— 1) Estudiantes ———
        total_estudiantes = 0
        detalle_estudiantes = []
        for est in inv.estudiante_set.all():
            tipo, status = est.tipo_estudiante.descripcion, est.status
            if tipo == "Maestría":
                pts = mapping_est_maestria.get(status, 0)
            elif tipo == "Doctorado":
                pts = mapping_est_doctorado.get(status, 0)
            else:
                pts = 0

            total_estudiantes += pts
            detalle_estudiantes.append(
                {
                    "estudiante_id": est.id,
                    "tipo": tipo,
                    "status": status,
                    "puntos": pts,
                }
            )

        # ——— 2) Líneas reconocidas ———
        reconocidas = inv.detlineas_set.filter(reconocido=True)
        total_lineas = reconocidas.count() * 5
        detalle_lineas = [
            {"linea_id": dl.linea.id, "descripcion": dl.linea.descripcion, "puntos": 5}
            for dl in reconocidas
        ]

        # ——— 3) Proyectos ———
        total_proyectos = 0
        detalle_proyectos = []
        for dp in inv.detproy_set.all():
            status = dp.proyecto.status
            pts = mapping_proyectos.get(status, 0)
            total_proyectos += pts
            detalle_proyectos.append(
                {
                    "proyecto_id": dp.proyecto.id,
                    "nombre": dp.proyecto.nombre,
                    "status": status,
                    "puntos": pts,
                }
            )

        # ——— 4) Artículos ———
        total_articulos = 0
        detalle_articulos = []
        for da in inv.detart_set.all():
            if da.es_principal:
                pts = mapping_articulos_principal.get(da.articulo.status, 0)
            else:
                pts = 3
            total_articulos += pts
            detalle_articulos.append(
                {
                    "articulo_id": da.articulo.id,
                    "status": da.articulo.status,
                    "es_principal": da.es_principal,
                    "puntos": pts,
                }
            )

        # ——— 5) Materias ———
        total_materias = 0
        detalle_materias = []
        for dm in inv.detmateria_set.all():
            pts = 5
            total_materias += pts
            detalle_materias.append(
                {
                    "materia_id": dm.materia.id,
                    "nombre": dm.materia.nombre,
                    "puntos": pts,
                }
            )

        # ——— 6) Eventos ———
        total_eventos = 0
        detalle_eventos = []
        for de in inv.deteventos_set.all():
            tipo_ev = de.evento.tipo_evento.descripcion
            pts = mapping_eventos.get(tipo_ev, 0)
            total_eventos += pts
            detalle_eventos.append(
                {
                    "evento_id": de.evento.id,
                    "tipo": tipo_ev,
                    "nombre": de.evento.nombre,
                    "puntos": pts,
                }
            )

        # ——— Total general ———
        total_score = (
            total_estudiantes
            + total_lineas
            + total_proyectos
            + total_articulos
            + total_materias
            + total_eventos
        )

        return Response(
            {
                "score_estudiantes": {
                    "total": total_estudiantes,
                    "detalle": detalle_estudiantes,
                },
                "score_lineas": {"total": total_lineas, "detalle": detalle_lineas},
                "score_proyectos": {
                    "total": total_proyectos,
                    "detalle": detalle_proyectos,
                },
                "score_articulos": {
                    "total": total_articulos,
                    "detalle": detalle_articulos,
                },
                "score_materias": {
                    "total": total_materias,
                    "detalle": detalle_materias,
                },
                "score_eventos": {"total": total_eventos, "detalle": detalle_eventos},
                "score_total": total_score,
            }
        )
