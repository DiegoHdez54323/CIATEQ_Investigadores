import os
from io import StringIO
from django.core.management import call_command
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
import traceback

class UploadSeeder(ViewSet):
    def create(self, request):
        archivo = request.FILES.get('archivo')
        if not archivo:
            return Response({"error": "no se recibió archivo"}, status=400)
        
        if archivo.name != "seed_data.py":
            return Response({"error": "el archivo debe llamarse 'seed_data.py'"}, status=400)
        
        # Crear directorios si no existen
        destino_dir = os.path.join("gestion", "management", "commands")
        os.makedirs(destino_dir, exist_ok=True)
        
        # Asegurar que los __init__.py existan para la estructura de paquetes
        for path in ["gestion", os.path.join("gestion", "management"),
                     os.path.join("gestion", "management", "commands")]:
            init_file = os.path.join(path, "__init__.py")
            if not os.path.exists(init_file):
                with open(init_file, "w") as f:
                    pass  # Crear archivo vacío
        
        # Guardar el archivo
        ruta_destino = os.path.join(destino_dir, "seed_data.py")
        with open(ruta_destino, "wb+") as destino:
            for chunk in archivo.chunks():
                destino.write(chunk)
        
        # Ejecutar el comando usando la API de Django
        try:
            output = StringIO()
            error_output = StringIO()
            
            call_command('seed_data', stdout=output, stderr=error_output)
            
            return Response({
                "status": "archivo recibido y ejecutado correctamente",
                "output": output.getvalue()
            })
        except Exception as e:
            return Response({
                "error": str(e),
                "traceback": traceback.format_exc(),
                "output": output.getvalue() if 'output' in locals() else "",
                "error_output": error_output.getvalue() if 'error_output' in locals() else ""
            }, status=500)