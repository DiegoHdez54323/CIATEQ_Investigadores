# Proyecto CIATEQ Investigadores

Este proyecto consiste en una plataforma web para la gestión de investigadores, proyectos, estudiantes, publicaciones y eventos dentro de un centro de investigación.

## Instalación y ejecución en entorno de desarrollo

### Backend

1. Crear un entorno virtual:

   ```sh
   python -m venv venv
   ```

2. Activar el entorno virtual:

   - En Windows:
     ```sh
     venv\Scripts\activate
     ```
   - En macOS/Linux:
     ```sh
     source venv/bin/activate
     ```

3. Instalar las dependencias:

   ```sh
   pip install -r requirements.txt
   ```

4. Ajustar las credenciales de la BD en `settings.py` según tu configuración local, y aplicar las migraciones.

5. Ejecutar el servidor backend:

   ```sh
   cd backend
   python manage.py runserver
   ```

   La API estará disponible en: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

### Frontend

1. Ir a la carpeta del frontend:

   ```sh
   cd frontend
   ```

2. Instalar las dependencias del frontend:

   ```sh
   npm install
   ```

3. Levantar el servidor de desarrollo:

   ```sh
   npm run dev
   ```

   La aplicación estará disponible en: [http://localhost:5173](http://localhost:5173)
