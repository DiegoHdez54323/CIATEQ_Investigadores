# backend/gestion/management/commands/seed_data.py

from django.core.management.base import BaseCommand
from datetime import date
from gestion.models import (
    Materia,
    Carreras,
    NivelSnii,
    TipoEstudiante,
    TipoEvento,
    Herramientas,
    Lineas,
    Articulos,
    Proyectos,
    Investigador,
    Snii,
    TipoEvento,
    Eventos,
    Estudiante,
    Educacion,
    DetArt,
    DetEventos,
    DetHerr,
    DetLineas,
    DetProy,
    DetMateria,
    Usuarios,
)


class Command(BaseCommand):
    help = "Llena las tablas base con datos iniciales"

    def handle(self, *args, **kwargs):
        self.stdout.write("Iniciando llenado de tablas...")

        # Materias
        materias = ["Matemáticas", "Física", "Programación", "Química", "Biología"]
        for nombre in materias:
            Materia.objects.get_or_create(nombre=nombre)

        # Carreras
        carreras = [
            "Ingeniería Mecánica",
            "Ingeniería Electrónica",
            "Ingeniería en Sistemas",
            "Biotecnología",
        ]
        for nombre in carreras:
            Carreras.objects.get_or_create(nombre=nombre)

        # NivelSnii
        niveles_snii = ["Candidato", "Nivel I", "Nivel II", "Nivel III"]
        for descripcion in niveles_snii:
            NivelSnii.objects.get_or_create(descripcion=descripcion)

        # TipoEstudiante
        tipos_estudiante = ["Servicio Social", "Practicante", "Maestría", "Doctorado"]
        for descripcion in tipos_estudiante:
            TipoEstudiante.objects.get_or_create(descripcion=descripcion)

        # TipoEvento
        tipos_evento = ["Congreso", "Taller", "Conferencia", "Diplomado", "Charla"]
        for descripcion in tipos_evento:
            TipoEvento.objects.get_or_create(descripcion=descripcion)

        # Herramientas
        herramientas = ["SolidWorks", "AutoCAD", "MATLAB", "Python", "Raspberry Pi"]
        for descripcion in herramientas:
            Herramientas.objects.get_or_create(descripcion=descripcion)

        # Líneas
        lineas = [
            "Inteligencia Artificial",
            "Mecatrónica",
            "Energías Renovables",
            "Biotecnología",
            "Nanotecnología",
        ]
        for descripcion in lineas:
            Lineas.objects.get_or_create(descripcion=descripcion)

        # Articulos
        articulos = [
            {
                "fecha_publicacion": date(2023, 5, 20),
                "doi": "10.1234/abcd.2023.01",
                "url": "https://revista-cientifica.com/articulo1",
                "nombre": "Aplicaciones de la Inteligencia Artificial en la Medicina",
                "nombre_revista": "Revista Internacional de Tecnología Médica",
                "pais_publicacion": "México",
                "anio_publicacion": 2023,
                "resumen": "Este artículo explora las principales aplicaciones de IA en medicina moderna.",
                "citados": 5,
                "status": "Publicado",
            },
            {
                "fecha_publicacion": date(2022, 11, 15),
                "doi": "10.5678/efgh.2022.02",
                "url": "https://revista-cientifica.com/articulo2",
                "nombre": "Energías Renovables y su Impacto en la Economía Global",
                "nombre_revista": "Energía y Sociedad",
                "pais_publicacion": "España",
                "anio_publicacion": 2022,
                "resumen": "Se analiza el crecimiento del mercado de energías limpias en diferentes regiones.",
                "citados": 8,
                "status": "Terminado",
            },
        ]

        for data in articulos:
            Articulos.objects.get_or_create(nombre=data["nombre"], defaults=data)

        # Proyectos
        proyectos = [
            {
                "nombre": "Sistema de Automatización Industrial",
                "fecha_inicio": date(2024, 1, 10),
                "fecha_termino": date(2024, 12, 20),
                "ingresos": 1500000.00,
                "descripcion": "Proyecto enfocado en la instalación de sistemas automáticos para una planta industrial.",
                "status": "Proceso",
            },
            {
                "nombre": "Plataforma Educativa Basada en IA",
                "fecha_inicio": date(2023, 3, 1),
                "fecha_termino": date(2023, 11, 30),
                "ingresos": 850000.00,
                "descripcion": "Desarrollo de una plataforma educativa con algoritmos de aprendizaje adaptativo.",
                "status": "Instalado",
            },
        ]

        for data in proyectos:
            Proyectos.objects.get_or_create(nombre=data["nombre"], defaults=data)

        # Investigadores
        investigadores = [
            {
                "nombre": "Juan",
                "apellido": "Pérez",
                "telefono": "555-1234",
                "correo": "juan.perez@example.com",
                "sueldo": 45000.00,
                "titulo": "Dr.",
                "ubicacion": "Ciudad de México",
                "avatar": "avatars/juan.png",
                "bio": "Investigador en el área de Inteligencia Artificial con 10 años de experiencia.",
            },
            {
                "nombre": "María",
                "apellido": "López",
                "telefono": "555-5678",
                "correo": "maria.lopez@example.com",
                "sueldo": 47000.00,
                "titulo": "Mtra.",
                "ubicacion": "Guadalajara",
                "avatar": "avatars/maria.png",
                "bio": "Especialista en Energías Renovables y proyectos de sostenibilidad.",
            },
            {
                "nombre": "Carlos",
                "apellido": "Ramírez",
                "telefono": "555-9012",
                "correo": "carlos.ramirez@example.com",
                "sueldo": 50000.00,
                "titulo": "Ing.",
                "ubicacion": "Monterrey",
                "avatar": "avatars/carlos.png",
                "bio": "Ingeniero en sistemas electrónicos, enfocado en automatización industrial.",
            },
        ]

        for data in investigadores:
            Investigador.objects.get_or_create(correo=data["correo"], defaults=data)

        # Snii
        investigadores = Investigador.objects.all()
        niveles = list(NivelSnii.objects.all())

        snii_data = [
            {
                "investigador": investigadores[0],
                "nivel": niveles[0],  # Candidato
                "fecha_asignacion": date(2022, 5, 15),
            },
            {
                "investigador": investigadores[1],
                "nivel": niveles[1],  # Nivel I
                "fecha_asignacion": date(2021, 8, 20),
            },
            {
                "investigador": investigadores[2],
                "nivel": niveles[2],  # Nivel II
                "fecha_asignacion": date(2020, 3, 10),
            },
        ]

        for data in snii_data:
            Snii.objects.get_or_create(investigador=data["investigador"], defaults=data)

        # Eventos
        tipos_evento = list(TipoEvento.objects.all())
        eventos_data = [
            {
                "tipo_evento": tipos_evento[0],  # Congreso
                "nombre": "Congreso Internacional de Inteligencia Artificial",
                "lugar": "Ciudad de México",
                "fecha": date(2024, 7, 10),
                "duracion": 3,
                "empresa_invita": "TechWorld México",
            },
            {
                "tipo_evento": tipos_evento[1],  # Taller
                "nombre": "Taller de Energías Renovables",
                "lugar": "Guadalajara",
                "fecha": date(2024, 5, 5),
                "duracion": 2,
                "empresa_invita": "Green Energy Solutions",
            },
            {
                "tipo_evento": tipos_evento[2],  # Conferencia
                "nombre": "Conferencia de Automatización Industrial",
                "lugar": "Monterrey",
                "fecha": date(2024, 8, 15),
                "duracion": 1,
                "empresa_invita": "Industries 4.0 MX",
            },
        ]

        for data in eventos_data:
            Eventos.objects.get_or_create(nombre=data["nombre"], defaults=data)

        # Estudiantes
        investigadores = list(Investigador.objects.all())
        carreras = list(Carreras.objects.all())
        tipos_estudiante = list(TipoEstudiante.objects.all())

        estudiantes_data = [
            {
                "investigador": investigadores[0],
                "carrera": carreras[0],
                "tipo_estudiante": tipos_estudiante[0],  # Servicio Social
                "escuela": "Universidad Nacional Autónoma de México",
                "fecha_inicio": date(2024, 1, 15),
                "fecha_termino": date(2024, 7, 15),
                "sueldo": 3500.00,
                "nombre": "Luis Gómez",
                "status": "Activo",
            },
            {
                "investigador": investigadores[1],
                "carrera": carreras[1],
                "tipo_estudiante": tipos_estudiante[1],  # Practicante
                "escuela": "Instituto Tecnológico de Monterrey",
                "fecha_inicio": date(2023, 8, 1),
                "fecha_termino": date(2024, 2, 1),
                "sueldo": 3200.00,
                "nombre": "Ana Torres",
                "status": "Egresado",
            },
        ]

        for data in estudiantes_data:
            Estudiante.objects.get_or_create(
                investigador=data["investigador"], nombre=data["nombre"], defaults=data
            )

        # Educacion
        educacion_data = [
            {
                "investigador": investigadores[0],
                "grado": "Doctorado en Inteligencia Artificial",
                "institucion": "Universidad de Stanford",
                "anio": 2018,
            },
            {
                "investigador": investigadores[1],
                "grado": "Maestría en Energías Renovables",
                "institucion": "Universidad de Barcelona",
                "anio": 2017,
            },
            {
                "investigador": investigadores[2],
                "grado": "Ingeniería en Sistemas Electrónicos",
                "institucion": "Instituto Tecnológico de Monterrey",
                "anio": 2015,
            },
        ]

        for data in educacion_data:
            Educacion.objects.get_or_create(
                investigador=data["investigador"], grado=data["grado"], defaults=data
            )

        # # Tablas intermedias
        investigadores = list(Investigador.objects.all())
        articulos = list(Articulos.objects.all())
        eventos = list(Eventos.objects.all())
        proyectos = list(Proyectos.objects.all())
        materias = list(Materia.objects.all())
        herramientas = list(Herramientas.objects.all())
        lineas = list(Lineas.objects.all())

        # 1. DetArt (Investigador-Articulo)
        if investigadores and articulos:
            for i, investigador in enumerate(investigadores):
                if i < len(articulos):
                    DetArt.objects.get_or_create(
                        investigador=investigador,
                        articulo=articulos[i],
                        defaults={"es_principal": True if i % 2 == 0 else False},
                    )

        # 2. DetEventos (Investigador-Evento)
        if investigadores and eventos:
            roles = ["Ponente", "Organizador", "Asistente"]
            asuntos = [
                "Presentación de resultados",
                "Coordinación de logística",
                "Participación en mesas redondas",
            ]

            for i, investigador in enumerate(investigadores):
                if i < len(eventos):
                    DetEventos.objects.get_or_create(
                        investigador=investigador,
                        evento=eventos[i],
                        defaults={
                            "rol": roles[i % len(roles)],
                            "asunto": asuntos[i % len(asuntos)],
                        },
                    )

        # 3. DetHerr (Proyecto-Herramienta)
        if proyectos and herramientas:
            for i, proyecto in enumerate(proyectos):
                if i < len(herramientas):
                    DetHerr.objects.get_or_create(
                        proyecto=proyecto,
                        herramienta=herramientas[i],
                    )

        # 4. DetLineas (Investigador-Linea)
        if investigadores and lineas:
            for i, investigador in enumerate(investigadores):
                if i < len(lineas):
                    DetLineas.objects.get_or_create(
                        investigador=investigador,
                        linea=lineas[i],
                        defaults={"reconocido": True if i % 2 == 0 else False},
                    )

        # 5. DetProy (Investigador-Proyecto)
        if investigadores and proyectos:
            for i, investigador in enumerate(investigadores):
                if i < len(proyectos):
                    DetProy.objects.get_or_create(
                        investigador=investigador,
                        proyecto=proyectos[i],
                        defaults={"es_principal": True if i % 2 == 0 else False},
                    )

        # 6. DetMateria (Investigador-Materia)
        if investigadores and materias:
            for i, investigador in enumerate(investigadores):
                if i < len(materias):
                    DetMateria.objects.get_or_create(
                        investigador=investigador,
                        materia=materias[i],
                    )

        usuarios_data = [
            {
                "username": "admin",
                "password": "tecmilenio",
                "role": "admin",
            },
            {
                "username": "prueba",
                "password": "123",
                "role": "prueba",
            },
        ]

        for data in usuarios_data:
            Usuarios.objects.get_or_create(username=data["username"], defaults=data)

        self.stdout.write(self.style.SUCCESS("Tablas llenadas exitosamente."))
