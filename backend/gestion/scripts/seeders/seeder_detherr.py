import os
import sys
import django
import random

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
sys.path.append(BASE_DIR)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "main.settings")
django.setup()

from gestion.models import Proyectos, Herramientas, DetHerr

def seed_detherr():
    proyectos = Proyectos.objects.all()
    herramientas = list(Herramientas.objects.all())

    if not herramientas:
        print("⚠️ No hay herramientas registradas. Agrega algunas primero.")
        return

    total_creados = 0

    for proyecto in proyectos:
        num = random.randint(1, min(3, len(herramientas)))
        seleccionadas = random.sample(herramientas, num)

        for herramienta in seleccionadas:
            # Evita duplicados
            if not DetHerr.objects.filter(proyecto=proyecto, herramienta=herramienta).exists():
                DetHerr.objects.create(proyecto=proyecto, herramienta=herramienta)
                total_creados += 1

    print(f"✔️ Se crearon {total_creados} registros en DetHerr para {proyectos.count()} proyectos.")

if __name__ == "__main__":
    seed_detherr()
