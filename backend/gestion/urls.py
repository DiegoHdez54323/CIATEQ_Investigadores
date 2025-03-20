from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InvestigadorViewSet

router = DefaultRouter()
router.register(r"investigadores", InvestigadorViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
]
