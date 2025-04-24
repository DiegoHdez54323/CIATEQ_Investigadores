import os
import sys
import django
import random

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
sys.path.append(BASE_DIR)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "main.settings")
django.setup()

from gestion.models import Proyectos, Investigador, DetProy

def seed_detproy():
    proyectos = Proyectos.objects.all()
    investigadores = list(Investigador.objects.all())

    if not investigadores:
        print("⚠️ No hay investigadores registrados. Agrega algunos primero.")
        return

    total_creados = 0
    for proyecto in proyectos:
        num = random.randint(1, min(3, len(investigadores)))
        seleccionados = random.sample(investigadores, num)

        for i, investigador in enumerate(seleccionados):
            DetProy.objects.create(
                proyecto=proyecto,
                investigador=investigador,
                es_principal=(i == 0)  # solo el primero es principal
            )
            total_creados += 1

    print(f"✔️ Se crearon {total_creados} registros en DetProy para {proyectos.count()} proyectos.")

if __name__ == "__main__":
    seed_detproy()
