import os
import sys
import django
from datetime import datetime

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
sys.path.append(BASE_DIR)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "main.settings")
django.setup()

from gestion.models import Proyectos

def actualizar_duracion_real():
    proyectos = Proyectos.objects.exclude(fecha_inicio=None).exclude(fecha_termino=None)

    total_actualizados = 0

    for proyecto in proyectos:
        duracion = (proyecto.fecha_termino - proyecto.fecha_inicio).days
        proyecto.duracion_real = duracion
        proyecto.save()
        total_actualizados += 1

    print(f"Duración actualizada para {total_actualizados} proyectos.")

if __name__ == "__main__":
    actualizar_duracion_real()
