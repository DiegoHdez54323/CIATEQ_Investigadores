from django.db import models


# ============ 1. Modelos base (sin dependencias) ============


class Carreras(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(unique=True, max_length=100)

    class Meta:

        db_table = "carreras"


class NivelSnii(models.Model):
    id = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=50)

    class Meta:

        db_table = "nivel_snii"


class TipoEstudiante(models.Model):
    id = models.AutoField(primary_key=True)
    descripcion = models.CharField(unique=True, max_length=50)

    class Meta:
        db_table = "tipo_estudiante"


class TipoEvento(models.Model):
    id = models.AutoField(primary_key=True)
    descripcion = models.CharField(unique=True, max_length=50)

    class Meta:
        db_table = "tipo_evento"


class Herramientas(models.Model):
    id = models.AutoField(primary_key=True)
    descripcion = models.CharField(unique=True, max_length=100)

    class Meta:
        db_table = "herramientas"


class Lineas(models.Model):
    id = models.AutoField(primary_key=True)
    descripcion = models.CharField(unique=True, max_length=50)

    class Meta:
        db_table = "lineas"


class Articulos(models.Model):
    id = models.AutoField(primary_key=True)
    fecha_publicacion = models.DateField()
    doi = models.CharField(max_length=100, blank=True, null=True)
    url = models.CharField(max_length=200, blank=True, null=True)
    nombre = models.CharField(max_length=200)
    nombre_revista = models.CharField(max_length=200)
    pais_publicacion = models.CharField(max_length=100, blank=True, null=True)
    anio_publicacion = models.IntegerField(blank=True, null=True)

    resumen = models.TextField(blank=True, null=True)
    citados = models.IntegerField(default=0)

    class Meta:
        db_table = "articulos"


class Proyectos(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=200)
    fecha_inicio = models.DateField()
    fecha_termino = models.DateField()
    ingresos = models.DecimalField(max_digits=10, decimal_places=2)

    descripcion = models.TextField(blank=True, null=True)

    STATUS_CHOICES = [
        ("Pendiente", "Pendiente"),
        ("Activo", "Activo"),
        ("Pausado", "Pausado"),
        ("Completado", "Completado"),
        ("Cancelado", "Cancelado"),
    ]
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default="Pendiente",
    )

    class Meta:
        db_table = "proyectos"


class Usuarios(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(unique=True, max_length=50)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=50)

    class Meta:
        db_table = "usuarios"


# ============ 2. Modelos que dependen de otros ============


class Investigador(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    correo = models.CharField(unique=True, max_length=100)
    sueldo = models.DecimalField(max_digits=10, decimal_places=2)

    titulo = models.CharField(max_length=100, blank=True, null=True)
    ubicacion = models.CharField(max_length=200, blank=True, null=True)
    avatar = models.CharField(max_length=200, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)

    class Meta:
        db_table = "investigador"


class Snii(models.Model):
    id = models.AutoField(primary_key=True)
    investigador = models.OneToOneField(Investigador, on_delete=models.CASCADE)
    nivel = models.ForeignKey(NivelSnii, on_delete=models.CASCADE)
    fecha_asignacion = models.DateField()

    class Meta:
        db_table = "snii"


class Eventos(models.Model):
    id = models.AutoField(primary_key=True)
    tipo_evento = models.ForeignKey(TipoEvento, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=200)
    lugar = models.CharField(max_length=100)
    fecha = models.DateField()
    duracion = models.IntegerField()
    empresa_invita = models.CharField(max_length=200)

    class Meta:
        db_table = "eventos"


class Estudiante(models.Model):
    id = models.AutoField(primary_key=True)
    investigador = models.ForeignKey(Investigador, on_delete=models.CASCADE)
    carrera = models.ForeignKey(Carreras, on_delete=models.CASCADE)
    tipo_estudiante = models.ForeignKey(TipoEstudiante, on_delete=models.CASCADE)
    escuela = models.CharField(max_length=100)
    fecha_inicio = models.DateField()
    fecha_termino = models.DateField()
    sueldo = models.DecimalField(max_digits=10, decimal_places=2, default=3200.00)
    nombre = models.CharField(max_length=100, blank=True, null=True)

    STATUS_CHOICES = [
        ("Activo", "Activo"),
        ("Abandonó", "Abandonó"),
        ("Graduado", "Graduado"),
    ]
    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default="Active",
    )

    class Meta:
        db_table = "estudiante"


class Educacion(models.Model):
    id = models.AutoField(primary_key=True)
    investigador = models.ForeignKey(
        Investigador, on_delete=models.CASCADE, related_name="educacion"
    )
    grado = models.CharField(max_length=200)
    institucion = models.CharField(max_length=200)
    anio = models.IntegerField()

    class Meta:
        db_table = "educacion"


# ============ 3. Modelos que originalmente tenían claves compuestas ============


class DetArt(models.Model):
    id = models.AutoField(primary_key=True)
    investigador = models.ForeignKey(Investigador, on_delete=models.CASCADE)
    articulo = models.ForeignKey(Articulos, on_delete=models.CASCADE)
    es_principal = models.BooleanField(blank=True, null=True)

    class Meta:
        db_table = "det_art"
        unique_together = (("investigador", "articulo"),)


class DetEventos(models.Model):
    id = models.AutoField(primary_key=True)
    investigador = models.ForeignKey(Investigador, on_delete=models.CASCADE)
    evento = models.ForeignKey(Eventos, on_delete=models.CASCADE)

    rol = models.CharField(max_length=100, blank=True, null=True)
    asunto = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        db_table = "det_eventos"
        unique_together = (("investigador", "evento"),)


class DetHerr(models.Model):
    id = models.AutoField(primary_key=True)
    proyecto = models.ForeignKey(Proyectos, on_delete=models.CASCADE)
    herramienta = models.ForeignKey(Herramientas, on_delete=models.CASCADE)

    class Meta:
        db_table = "det_herr"
        unique_together = (("proyecto", "herramienta"),)


class DetLineas(models.Model):
    id = models.AutoField(primary_key=True)
    investigador = models.ForeignKey(Investigador, on_delete=models.CASCADE)
    linea = models.ForeignKey(Lineas, on_delete=models.CASCADE)

    class Meta:
        db_table = "det_lineas"
        unique_together = (("investigador", "linea"),)


class DetProy(models.Model):
    id = models.AutoField(primary_key=True)
    investigador = models.ForeignKey(Investigador, on_delete=models.CASCADE)
    proyecto = models.ForeignKey(Proyectos, on_delete=models.CASCADE)
    es_principal = models.BooleanField(blank=True, null=True)

    class Meta:
        db_table = "det_proy"
        unique_together = (("investigador", "proyecto"),)
