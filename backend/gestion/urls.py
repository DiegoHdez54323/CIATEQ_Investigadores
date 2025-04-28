from django.urls import path, include
from rest_framework.routers import DefaultRouter
from gestion.views import (
    InvestigadorViewSet,
    SniiViewSet,
    NivelSniiViewSet,
    LineasViewSet,
    DetLineasViewSet,
    DetArtViewSet,
    ArticulosViewSet,
    TipoEventoViewSet,
    EventosViewSet,
    DetEventosViewSet,
    HerramientasViewSet,
    DetHerrViewSet,
    ProyectosViewSet,
    DetProyViewSet,
    CarrerasViewSet,
    TipoEstudianteViewSet,
    EstudiantesViewSet,
    UsuariosViewSet,
    dashboard_data,
    EducacionViewSet,
    MateriaViewSet,
    DetMateriaViewset,
)


router = DefaultRouter()
router.register(r"investigadores", InvestigadorViewSet)
router.register(r"nivelsnii", NivelSniiViewSet)
router.register(r"snii", SniiViewSet)
router.register(r"lineas", LineasViewSet)
router.register(r"detlineas", DetLineasViewSet)
router.register(r"detart", DetArtViewSet)
router.register(r"articulos", ArticulosViewSet)
router.register(r"tipoevento", TipoEventoViewSet)
router.register(r"eventos", EventosViewSet)
router.register(r"deteventos", DetEventosViewSet)
router.register(r"herramientas", HerramientasViewSet)
router.register(r"detherr", DetHerrViewSet)
router.register(r"proyectos", ProyectosViewSet)
router.register(r"detproy", DetProyViewSet)
router.register(r"carreras", CarrerasViewSet)
router.register(r"tipoestudiante", TipoEstudianteViewSet)
router.register(r"estudiantes", EstudiantesViewSet)
router.register(r"usuarios", UsuariosViewSet)
router.register(r"educacion", EducacionViewSet)
router.register(r"materia", MateriaViewSet)
router.register(r"detmateria", DetMateriaViewset)


urlpatterns = [
    path("api/", include(router.urls)),
    path("api/dashboard/", dashboard_data, name="dashboard-data"),
]
