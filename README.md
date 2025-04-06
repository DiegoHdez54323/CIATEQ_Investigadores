# Proyecto CIATEQ Investigadores

Este proyecto consiste en una plataforma web para la **gestión de investigadores, proyectos, estudiantes, publicaciones y eventos** dentro de un centro de investigación.

![dashboard principal](./resources/ciateq_main_dashboard.png)

---

## 🚀 Tecnologías utilizadas

### Backend

- **NginX** (TODO)
- **Python _3.13_** con:
  - Django 5.1.7
  - djangorestframework
  - django-filter
  - django-cors-headers
  - djangorestframework_simplejwt

### Frontend

- **Node _v23.7.0_ y NPM _10.9.2_** con:
  - React usando Vite _6.2.0_
  - Tailwind CSS _4.0.15_
  - Lucide React Icons 

---

## 🗄️ Base de datos

### Estructura de la base de datos

Para entender la estructura de la base de datos, aqui está el diagrama Entidad Relacion del mismo.

![database image](./resources/ciateq_investigadores_django%20-%20public.png)

---

## ⚙️ Instrucciones para desarrollo

### 💾 Backend (Django API)

1. Crear un entorno virtual (opcional pero recomendado):

```bash
python -m venv env
source env/bin/activate  # o env\Scripts\activate en Windows
```

2. Instalar las dependencias:

```bash
pip install -r requirements.txt
```

3. Configurar la base de datos en `backend/main/settings.py` según tus credenciales locales:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'nombre_basededatos',
        'USER': 'usuario',
        'PASSWORD': 'contraseña',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

4. Aplicar migraciones:

```bash
python manage.py migrate
```

5. Crear los archivos para comandos personalizados:
En la carpeta de tu aplicación Django, crea las siguientes carpetas y archivos:

```bash
app/
└── management/
    └── commands/
        └── seed_data.py
    └── __init__.py
└── __init__.py
```

El script del seeder se encuentra en la ruta raiz del projecto, y lleva el nombre de `seed_data.py`

6. Ejecutar el comando para sembrar los datos iniciales:

```bash
python manage.py seed_data
```

7. Iniciar el servidor backend:

```bash
cd backend
python manage.py runserver
```

8. La API estará disponible en:

```
http://127.0.0.1:8000/
```

---

### 🖌️ Frontend (React)

1. Ir a la carpeta del frontend:

```bash
cd frontend
```

2. Instalar las dependencias:

```bash
npm install
```

3. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

4. La aplicación estará disponible en:

```
http://localhost:5173/
```

---

## 👤 Credenciales de usuarios de prueba:

**Admin**
- Usuario: admin
- Contraseña: tecmilenio

**Usuario comun**
- Usuario: prueba
- Contraseña: 123

![login image](./resources/ciateq_login.png)

---