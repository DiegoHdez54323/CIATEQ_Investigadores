from django.urls import path, include
from rest_framework.routers import DefaultRouter
from gestion.views import InvestigadorViewSet, SniiViewSet, NivelSniiViewSet

router = DefaultRouter()
router.register(r"investigadores", InvestigadorViewSet)
router.register(r"nivelsnii", NivelSniiViewSet)
router.register(r"snii", SniiViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
]
