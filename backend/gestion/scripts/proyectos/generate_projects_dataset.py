import os
import sys
import django
import pandas as pd

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
sys.path.append(BASE_DIR)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "main.settings")
django.setup()

from django.db.models import Count, Avg, IntegerField
from django.db.models.functions import Cast
from gestion.models import Proyectos, DetProy, DetHerr

def generar_dataset():
    # Filtrar proyectos que ya tienen duración real
    proyectos = Proyectos.objects.exclude(duracion_real=None)

    # Convertir a DataFrame base
    df = pd.DataFrame.from_records(proyectos.values(
        'id', 'nombre', 'ingresos', 'duracion_real'
    ))

    # Agregar número de investigadores
    investigadores = (
        DetProy.objects
        .values('proyecto')
        .annotate(num_investigadores=Count('investigador'))
    )
    df_inv = pd.DataFrame(list(investigadores)).rename(columns={'proyecto': 'id'})
    df = df.merge(df_inv, on='id', how='left')

    # Agregar número de herramientas
    herramientas = (
        DetHerr.objects
        .values('proyecto')
        .annotate(num_herramientas=Count('herramienta'))
    )
    df_herr = pd.DataFrame(list(herramientas)).rename(columns={'proyecto': 'id'})
    df = df.merge(df_herr, on='id', how='left')

    # Agregar promedio de es_principal
    principales = (
        DetProy.objects
        .annotate(es_principal_int=Cast('es_principal', output_field=IntegerField()))
        .values('proyecto')
        .annotate(es_principal_promedio=Avg('es_principal_int'))
    )   
    df_principal = pd.DataFrame(list(principales)).rename(columns={'proyecto': 'id'})
    df = df.merge(df_principal, on='id', how='left')

    # Rellenar valores faltantes con ceros (por si algún proyecto no tiene datos en relaciones)
    df = df.fillna(0)

    # Orden final de columnas
    df = df[[
        'id', 'nombre', 'ingresos', 'num_investigadores',
        'num_herramientas', 'es_principal_promedio', 'duracion_real'
    ]]

    # Guardar CSV
    output_path = os.path.join(BASE_DIR, "datasets", "dataset_proyectos.csv")
    df.to_csv(output_path, index=False)
    print(f"✔️ Dataset generado y guardado en: {output_path}")

    return df

if __name__ == "__main__":
    df = generar_dataset()
    print(df.head())
