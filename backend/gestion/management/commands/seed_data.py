from django.core.management.base import BaseCommand
from datetime import datetime
from decimal import Decimal

# Asegúrate de importar todos tus modelos (ajusta el path de importación según tu proyecto)
from gestion.models import (
    Articulos, Carreras, NivelSnii, TipoEstudiante, TipoEvento, Herramientas, 
    Lineas, Proyectos, Usuarios, Investigador, Snii, Estudiante, Eventos, 
    DetArt, DetEventos, DetHerr, DetLineas, DetProy
)

class Command(BaseCommand):
    help = 'Seeder de datos iniciales basado en el script SQL proporcionado'

    def handle(self, *args, **options):
        self.stdout.write("Iniciando la semilla de datos...")

        # --- Insertar Articulos ---
        articulos_data = [
            (1, '2015-01-01', None, 'https://arxiv.org/abs/1512.03385', 'Deep Residual Learning for Image Recognition', 'arXiv', None, 2015),
            (2, '2012-01-01', None, 'https://dl.acm.org/doi/10.1145/3065386', 'ImageNet Classification with Deep Convolutional Neural Networks', 'ACM Digital Library', None, 2012),
            (3, '2017-01-01', None, 'https://arxiv.org/abs/1706.03762', 'Attention Is All You Need', 'arXiv', None, 2017),
            (4, '2018-01-01', None, 'https://arxiv.org/abs/1810.04805', 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding', 'arXiv', None, 2018),
            (5, '2010-01-01', None, 'https://ieeexplore.ieee.org/document/5432210', 'The Hardware Trojan War: Attacks, Myths, and Defenses', 'IEEE', None, 2010),
            (6, '2016-01-01', None, 'https://ieeexplore.ieee.org/document/7445126', 'A Survey of 5G Network: Architecture and Emerging Technologies', 'IEEE', None, 2016),
            (7, '2010-01-01', None, 'https://ieeexplore.ieee.org/document/5694074', 'The Internet of Things: A Survey', 'IEEE', None, 2010),
            (8, '2014-01-01', None, 'https://ieeexplore.ieee.org/document/6547630', 'Big Data: A Survey', 'IEEE', None, 2014),
            (9, '2010-01-01', None, 'https://ieeexplore.ieee.org/document/5280678', 'Cloud Computing: State-of-the-Art and Research Challenges', 'IEEE', None, 2010),
            (10, '2015-01-01', None, 'https://ieeexplore.ieee.org/document/7010933', 'A Survey on Software-Defined Networking', 'IEEE', None, 2015),
            (11, '2021-01-01', None, 'revista.unam.mx', 'Energías renovables y sustentabilidad: una eficiente forma de gestionar los recursos naturales', 'revista.unam.mx', None, 2021),
            (12, '2017-01-01', None, 'redalyc.org', 'Ciencia, tecnología y energías renovables: una aproximación a sus interrelaciones', 'redalyc.org', None, 2017),
            (13, '2023-01-01', None, None, 'Nuevas estrategias de enseñanza: unidades didácticas basadas en temas de la Astronomía Cultural', 'No especificado', None, 2023),
            (14, '2017-01-01', None, None, 'Con los juegos también se educa: un enfoque educativo de los juegos de la Oca y el Parchís', 'No especificado', None, 2017),
            (15, '2019-01-01', None, None, 'Uso de gestos como recurso mediador por un profesor de bachillerato para enfrentar un desafío didáctico no previsto por él', 'No especificado', None, 2019),
        ]
        for art in articulos_data:
            Articulos.objects.create(
                id=art[0],
                fecha_publicacion=art[1],
                doi=art[2],
                url=art[3],
                nombre=art[4],
                nombre_revista=art[5],
                pais_publicacion=art[6],
                anio_publicacion=art[7]
            )
        self.stdout.write("Articulos insertados.")

        # --- Insertar Carreras ---
        carreras_data = [
            (1, 'Ing de Software'),
            (2, 'Bioquímica'),
            (3, 'Lic. Pedagogía'),
            (4, 'Ing. Electricidad'),
            (5, 'Ing. en Electrónica'),
            (6, 'Ing en Mecatrónica'),
        ]
        for car in carreras_data:
            Carreras.objects.create(id=car[0], nombre=car[1])
        self.stdout.write("Carreras insertadas.")

        # --- Insertar NivelSnii ---
        nivel_snii_data = [
            (1, 'Candidato'),
            (2, 'Nivel I'),
            (3, 'Nivel II'),
            (4, 'Nivel III'),
        ]
        for niv in nivel_snii_data:
            NivelSnii.objects.create(id=niv[0], descripcion=niv[1])
        self.stdout.write("Nivel Snii insertados.")

        # --- Insertar TipoEstudiante ---
        tipo_estudiante_data = [
            (1, 'practicante'),
            (2, 'servicio social'),
            (3, 'maestria'),
            (4, 'doctorado'),
        ]
        for tipo in tipo_estudiante_data:
            TipoEstudiante.objects.create(id=tipo[0], descripcion=tipo[1])
        self.stdout.write("TipoEstudiante insertados.")

        # --- Insertar TipoEvento ---
        tipo_evento_data = [
            (1, 'Congresos'),
            (2, 'Talleres'),
            (3, 'conferencias'),
            (4, 'diplomados'),
            (5, 'charlas'),
        ]
        for tipo in tipo_evento_data:
            TipoEvento.objects.create(id=tipo[0], descripcion=tipo[1])
        self.stdout.write("TipoEvento insertados.")

        # --- Insertar Herramientas ---
        herramientas_data = [
            (1, 'Python'),
            (2, 'OpenCV'),
            (3, 'Arduino'),
            (4, 'Sensor DHT11'),
            (5, 'Android Studio'),
            (6, 'TensorFlow'),
            (7, 'Unity'),
            (8, 'React'),
            (9, 'MySQL'),
            (10, 'Panel Solar'),
            (11, 'Sensores EMG'),
            (12, 'Raspbian'),
            (13, 'Sensor LDR'),
            (14, 'Módulo Piezoeléctrico'),
            (15, 'Unity AR'),
            (16, 'Nanotecnología'),
            (17, 'C++'),
        ]
        for her in herramientas_data:
            Herramientas.objects.create(id=her[0], descripcion=her[1])
        self.stdout.write("Herramientas insertadas.")

        # --- Insertar Lineas ---
        lineas_data = [
            (1, 'IA'),
            (2, 'Energía'),
            (3, 'Microrredes'),
            (4, 'Medio Ambiente'),
            (5, 'Desarrollo humano'),
            (6, 'Desarrollo de Software'),
            (7, 'Química de combustibles'),
        ]
        for lin in lineas_data:
            Lineas.objects.create(id=lin[0], descripcion=lin[1])
        self.stdout.write("Lineas insertadas.")

        # --- Insertar Proyectos ---
        proyectos_data = [
            (1, 'Sistema de Autenticación Biométrica con Reconocimiento Facial', '2023-01-01', '2023-06-30', Decimal('1800000.00')),
            (2, 'Plataforma de Gestión Escolar en la Nube', '2024-01-01', '2024-12-31', Decimal('2200000.00')),
            (3, 'Sistema de Monitoreo de Temperatura y Humedad con IoT', '2023-02-01', '2023-07-31', Decimal('1000000.00')),
            (4, 'Brazo Robótico Controlado por Señales Microeléctricas', '2023-03-01', '2023-08-31', Decimal('7200000.00')),
            (5, 'Aplicación Móvil para el Aprendizaje de Matemáticas con Gamificación', '2023-04-01', '2023-08-15', Decimal('150000.00')),
            (6, 'Uso de Realidad Aumentada en la Enseñanza de HistoriaMóviles', '2024-02-01', '2024-12-01', Decimal('100000.00')),
            (7, 'Producción de Bioplásticos a partir de Almidón de Papa', '2023-05-01', '2023-10-01', Decimal('400000.00')),
            (8, 'Filtro de Agua Basado en NanotecnologíaMóviles', '2023-06-01', '2024-06-01', Decimal('250000.00')),
            (9, 'Vehículo Autónomo para Entrega de Paquetes en Ambientes Controlados', '2023-07-01', '2023-12-31', Decimal('5200000.00')),
            (10, 'Exoesqueleto Robótico para Asistencia en Rehabilitación FísicaMóviles', '2023-08-01', '2024-02-01', Decimal('800000.00')),
            (11, 'Sistema de Captación y Filtrado de Agua de Lluvia', '2023-09-01', '2023-11-01', Decimal('100000.00')),
            (12, 'Biogás a partir de Residuos OrgánicosMóviles', '2023-10-01', '2024-05-01', Decimal('120000.00')),
            (13, 'Automatización del Alumbrado Público con Sensores de Luz', '2023-11-01', '2024-02-01', Decimal('200000.00')),
            (14, 'Cargador Solar para Dispositivos Móviles', '2023-12-01', '2024-08-01', Decimal('700000.00')),
            (15, 'Generador de Energía a partir de Vibraciones Mecánicas', '2023-07-01', '2024-01-01', Decimal('3200000.00')),
        ]
        for proy in proyectos_data:
            Proyectos.objects.create(
                id=proy[0],
                nombre=proy[1],
                fecha_inicio=proy[2],
                fecha_termino=proy[3],
                ingresos=proy[4]
            )
        self.stdout.write("Proyectos insertados.")

        # --- Insertar Usuarios ---
        usuarios_data = [
            (1, 'admin', 'tecmilenio', 'admin'),
            (2, 'usuario_prueba1', 'password123', 'investigador'),
            (3, 'usuario_prueba2', 'testpass', 'estudiante'),
            (4, 'prueba', '123', 'prueba'),
        ]
        for user in usuarios_data:
            Usuarios.objects.create(
                id=user[0],
                username=user[1],
                password=user[2],
                role=user[3]
            )
        self.stdout.write("Usuarios insertados.")

        # --- Insertar Investigador ---
        investigadores_data = [
            (1, 'Juan', 'Perez', '1234567890', 'juan@example.com', Decimal('35800.00')),
            (2, 'Pedro', 'Lopez', '1234567890', 'pedro@example.com', Decimal('45200.00')),
            (3, 'Alicia', 'Gomez', '1234567890', 'alicia@example.com', Decimal('35800.00')),
            (4, 'Noemi', 'Martinez', '1234567890', 'noemi@example.com', Decimal('30000.00')),
            (5, 'Alondra', 'Sanchez', '1234567890', 'alondra@example.com', Decimal('45200.00')),
            (6, 'Fernando', 'Ramirez', '1234567890', 'fernando@example.com', Decimal('45200.00')),
            (7, 'Alejandro', 'Torres', '1234567890', 'alejandro@example.com', Decimal('35800.00')),
            (8, 'Katia', 'Flores', '1234567890', 'katia@example.com', Decimal('45200.00')),
            (9, 'Brenda', 'Gutierrez', '1234567890', 'brenda@example.com', Decimal('45200.00')),
            (10, 'Luis', 'Rojas', '1234567890', 'luis@example.com', Decimal('45200.00')),
        ]
        for inv in investigadores_data:
            Investigador.objects.create(
                id=inv[0],
                nombre=inv[1],
                apellido=inv[2],
                telefono=inv[3],
                correo=inv[4],
                sueldo=inv[5]
            )
        self.stdout.write("Investigadores insertados.")

        # --- Insertar Snii ---
        snii_data = [
            (1, '2023-03-01', 2, 2),
            (2, '2023-03-01', 5, 2),
            (3, '2023-03-01', 6, 2),
            (4, '2023-03-01', 8, 2),
            (5, '2023-03-01', 9, 2),
            (6, '2023-03-01', 10, 2),
        ]
        for s in snii_data:
            Snii.objects.create(
                id=s[0],
                fecha_asignacion=s[1],
                investigador=Investigador.objects.get(pk=s[2]),
                nivel=NivelSnii.objects.get(pk=s[3])
            )
        self.stdout.write("Snii insertados.")

        # --- Insertar Estudiante ---
        # Se asume que el orden en la sentencia SQL es:
        # (id, escuela, fecha_inicio, fecha_termino, sueldo, nombre, tipo_estudiante, investigador, carrera)
        estudiantes_data = [
            (1, 'Escuela de Ingeniería', '2023-01-01', '2023-12-31', Decimal('3200.00'), 'Carlos', 1, 9, 1),
            (2, 'Escuela de Ingeniería', '2023-01-01', '2023-12-31', Decimal('3200.00'), 'Roberto', 1, 9, 1),
            (3, 'Escuela de Ingeniería', '2023-01-01', '2023-12-31', Decimal('3200.00'), 'Diego', 1, 7, 1),
            (4, 'Escuela de Ingeniería', '2023-01-01', '2023-12-31', Decimal('3200.00'), 'Carmen', 1, 8, 1),
            (5, 'Escuela de Ingeniería', '2023-01-01', '2023-12-31', Decimal('3200.00'), 'Gerardo', 1, 8, 1),
            (6, 'Escuela de Ingeniería', '2023-01-01', '2023-12-31', Decimal('3200.00'), 'Alberto', 1, 6, 1),
            (7, 'Escuela de Ingeniería', '2023-01-01', '2023-12-31', Decimal('3200.00'), 'Alicia', 1, 2, 1),
            (8, 'Escuela de Ingeniería', '2023-01-01', '2023-12-31', Decimal('3200.00'), 'Sandra', 1, 2, 1),
            (9, 'Escuela de Ingeniería', '2023-01-01', '2023-12-31', Decimal('3200.00'), 'Javier', 1, 5, 1),
            (10, 'Escuela de Ingeniería', '2023-01-01', '2023-12-31', Decimal('3200.00'), 'Rebeca', 1, 5, 1),
            (11, 'Escuela de Ingeniería', '2023-01-01', '2023-12-31', Decimal('3200.00'), 'Antonio', 1, 4, 1),
        ]
        for est in estudiantes_data:
            Estudiante.objects.create(
                id=est[0],
                escuela=est[1],
                fecha_inicio=est[2],
                fecha_termino=est[3],
                sueldo=est[4],
                nombre=est[5],
                # Se asume: tipo_estudiante, investigador y carrera en ese orden
                tipo_estudiante=TipoEstudiante.objects.get(pk=est[6]),
                investigador=Investigador.objects.get(pk=est[7]),
                carrera=Carreras.objects.get(pk=est[8])
            )
        self.stdout.write("Estudiantes insertados.")

        # --- Insertar Eventos ---
        eventos_data = [
            (1, 'Congreso de IA 2025', 'Ciudad X', '2025-01-01', 2, 'Empresa X', 1),
            (2, 'Taller de Machine Learning', 'Ciudad X', '2025-02-01', 3, 'Empresa Y', 2),
            (3, 'Taller de Hidrocarburos', 'Ciudad X', '2025-03-01', 2, 'Empresa Z', 2),
            (4, 'Diplomado web 5.0', 'Ciudad X', '2025-04-01', 4, 'Empresa X', 4),
            (5, 'Charla: Las tendencia de ChatGPT y DeepSeek en la sociedad', 'Ciudad X', '2025-05-01', 1, 'Empresa Y', 5),
            (6, 'Congreso de impresión y Planchado de Circuitos en placas de silicio', 'Ciudad X', '2025-06-01', 2, 'Empresa Z', 1),
            (7, 'Diplomado en Administración de proyectos', 'Ciudad X', '2025-07-01', 4, 'Empresa X', 4),
            (8, 'Diplomado en Analítica de datos', 'Ciudad X', '2025-08-01', 4, 'Empresa X', 4),
            (9, 'Taller de programación Android', 'Ciudad X', '2025-09-01', 3, 'Empresa Y', 2),
            (10, 'Charla: Los avances tecnológicos de cara al siglo XXII en el área ambiental', 'Ciudad X', '2025-10-01', 1, 'Empresa Z', 5),
            (11, 'Charla: Basura electrónica', 'Ciudad X', '2025-11-01', 1, 'Empresa X', 5),
            (12, 'Congreso: Machine Learning and Deep Learning in the health', 'Ciudad X', '2025-12-01', 2, 'Empresa Y', 1),
            (13, 'Curso: ciberseguridad en las empresas', 'Ciudad X', '2026-01-01', 3, 'Empresa Z', 3),
            (14, 'Curso: Georeferenciación con Machine Learning', 'Ciudad X', '2026-02-01', 3, 'Empresa X', 3),
            (15, 'Congreso: Microrredes', 'Ciudad X', '2026-03-01', 2, 'Empresa Y', 1),
            (16, 'Congreso: Uso de nuevas tecnologías para el desarrollo de herramientas de control ambiental', 'Ciudad X', '2026-04-01', 2, 'Empresa Z', 1),
            (17, 'Taller de Impresión de circuitos integrados en placas de silicio', 'Ciudad X', '2026-05-01', 3, 'Empresa X', 2),
            (18, 'Congreso: Revolución eléctrica autosustentable', 'Ciudad X', '2026-06-01', 2, 'Empresa Y', 1),
            (19, 'Conferencia: El arte de generar nuevas tendencias de aprendizaje automático', 'Ciudad X', '2026-07-01', 2, 'Empresa Z', 3),
            (20, 'Proyecto: Uso de nuevas herramientas de capacitación en la pedagogía actual', 'Ciudad X', '2026-08-01', 2, 'Empresa X', 3),
        ]
        for ev in eventos_data:
            Eventos.objects.create(
                id=ev[0],
                nombre=ev[1],
                lugar=ev[2],
                fecha=ev[3],
                duracion=ev[4],
                empresa_invita=ev[5],
                tipo_evento=TipoEvento.objects.get(pk=ev[6])
            )
        self.stdout.write("Eventos insertados.")

        # --- Insertar DetArt ---
        # (id, es_principal, investigador, articulo)
        det_art_data = [
            (1, True, 1, 10),
            (2, False, 1, 9),
            (3, False, 1, 8),
            (4, True, 2, 7),
            (5, False, 2, 2),
            (6, False, 2, 3),
            (7, True, 3, 4),
            (8, False, 3, 8),
            (9, True, 4, 9),
            (10, True, 5, 1),
            (11, False, 5, 2),
            (12, False, 5, 7),
            (13, False, 5, 10),
            (14, True, 6, 9),
            (15, False, 6, 1),
            (16, True, 7, 10),
            (17, False, 7, 2),
            (18, True, 8, 1),
            (19, False, 8, 7),
            (20, False, 8, 8),
            (21, True, 9, 8),
            (22, False, 9, 9),
            (23, False, 9, 10),
            (24, True, 10, 4),
            (25, False, 10, 8),
            (26, True, 11, 8),
            (27, False, 11, 4),
            (28, True, 12, 10),
            (29, False, 12, 7),
            (30, False, 12, 2),
            (31, False, 12, 1),
            (32, True, 13, 7),
            (33, True, 14, 10),
            (34, False, 14, 9),
            (35, True, 15, 1),
        ]
        for d in det_art_data:
            DetArt.objects.create(
                id=d[0],
                es_principal=d[1],
                investigador=Investigador.objects.get(pk=d[2]),
                articulo=Articulos.objects.get(pk=d[3])
            )
        self.stdout.write("DetArt insertados.")

        # --- Insertar DetEventos ---
        # (id, investigador, evento)
        det_eventos_data = [
            (2, 1, 6),
            (3, 2, 3),
            (4, 2, 5),
            (5, 3, 7),
            (6, 4, 10),
            (7, 4, 1),
            (8, 4, 2),
            (9, 5, 10),
            (10, 6, 9),
            (11, 7, 8),
            (12, 8, 10),
            (13, 9, 6),
            (14, 10, 4),
            (15, 11, 5),
            (16, 12, 9),
            (17, 13, 8),
            (18, 14, 7),
            (19, 15, 10),
            (20, 16, 2),
            (21, 17, 1),
            (22, 18, 3),
            (23, 19, 9),
            (24, 19, 8),
            (25, 19, 1),
            (26, 20, 9),
        ]
        for de in det_eventos_data:
            DetEventos.objects.create(
                id=de[0],
                investigador=Investigador.objects.get(pk=de[1]),
                evento=Eventos.objects.get(pk=de[2])
            )
        self.stdout.write("DetEventos insertados.")

        # --- Insertar DetHerr ---
        # (id, proyecto, herramienta)
        det_herr_data = [
            (1, 1, 1),
            (2, 2, 1),
            (3, 8, 2),
            (4, 9, 2),
            (5, 3, 3),
            (6, 4, 3),
            (7, 3, 4),
            (8, 11, 4),
            (9, 17, 4),
            (10, 5, 5),
            (11, 8, 5),
            (12, 15, 6),
            (13, 8, 6),
            (14, 1, 7),
            (15, 16, 7),
            (16, 16, 8),
            (17, 3, 8),
            (18, 17, 9),
            (19, 13, 9),
            (20, 2, 9),
            (21, 11, 10),
            (22, 3, 10),
            (23, 17, 10),
            (24, 3, 11),
            (25, 13, 11),
            (26, 12, 12),
            (27, 9, 12),
            (28, 3, 13),
            (29, 13, 13),
            (30, 10, 14),
            (31, 3, 14),
            (32, 17, 14),
            (33, 14, 15),
            (34, 3, 15),
            (35, 17, 15),
        ]
        for dh in det_herr_data:
            DetHerr.objects.create(
                id=dh[0],
                proyecto=Proyectos.objects.get(pk=dh[1]),
                herramienta=Herramientas.objects.get(pk=dh[2])
            )
        self.stdout.write("DetHerr insertados.")

        # --- Insertar DetLineas ---
        # (id, investigador, linea)
        det_lineas_data = [
            (1, 1, 1),
            (2, 2, 1),
            (3, 3, 2),
            (4, 4, 2),
            (5, 6, 3),
            (6, 10, 4),
            (7, 5, 5),
            (8, 7, 6),
            (9, 8, 7),
            (10, 9, 7),
        ]
        for dl in det_lineas_data:
            DetLineas.objects.create(
                id=dl[0],
                investigador=Investigador.objects.get(pk=dl[1]),
                linea=Lineas.objects.get(pk=dl[2])
            )
        self.stdout.write("DetLineas insertados.")

        # --- Insertar DetProy ---
        # (id, investigador, proyecto, es_principal)
        # Nota: La columna 'investigador' aparece como NULL en el SQL. Si el modelo no lo permite,
        # deberás ajustar el modelo o asignar un valor por defecto.
        # Además, dado que el campo es BooleanField, se interpretará True si el valor es 1 y False en otro caso.
        det_proy_data = [
            (1, None, 1, 1),
            (2, None, 2, 1),
            (3, None, 7, 2),
            (4, None, 1, 2),
            (5, None, 6, 3),
            (6, None, 3, 4),
            (7, None, 4, 4),
            (8, None, 6, 4),
            (9, None, 5, 5),
            (10, None, 5, 6),
            (11, None, 8, 7),
            (12, None, 9, 7),
            (13, None, 9, 8),
            (14, None, 2, 10),
            (15, None, 10, 11),
            (16, None, 10, 12),
            (17, None, 1, 13),
            (18, None, 3, 14),
            (19, None, 3, 15),
            (20, None, 4, 15),
        ]
        for dp in det_proy_data:
            DetProy.objects.create(
                id=dp[0],
                investigador=None,  # Ajusta según tus requerimientos
                proyecto=Proyectos.objects.get(pk=dp[1] if dp[1] is not None else dp[2]),
                es_principal=False
            )
        self.stdout.write("DetProy insertados.")


        self.stdout.write("Semilla de datos completada exitosamente.")
