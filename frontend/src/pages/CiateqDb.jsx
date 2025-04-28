import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CiateqDb() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Por favor selecciona un archivo.");
    if (file.name !== "seed_data.py") {
      return alert("El archivo debe llamarse 'seed_data.py'");
    }
    
    const formData = new FormData();
    formData.append("archivo", file);
    
    try {
      const response = await fetch("http://localhost:8000/gestion/api/upload_seeder/", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert(data.status || "Archivo subido correctamente");
        // Redireccionar a la página de login después de una respuesta exitosa
        navigate("/login");
      } else {
        alert(data.error || "Error al procesar el archivo");
      }
    } catch (err) {
      console.error("Error al subir:", err);
      alert("Error al subir el archivo");
    }
  };
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <img src="/ciateq.png" alt="CIATEQ Logo" className="h-24 mb-6" />
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subir archivo
          </label>
          <input
            id="file_input"
            type="file"
            accept=".py"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="file_input"
            className="inline-block px-4 py-2 bg-[#92283f] text-white font-semibold rounded-md cursor-pointer hover:bg-[#701d2f] transition"
          >
            Browse
          </label>
          <span className="ml-2 text-sm text-gray-600">
            {file ? file.name : "Ningún archivo seleccionado"}
          </span>
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white bg-[#92283f] rounded-md hover:bg-[#701d2f] transition"
        >
          Subir archivo
        </button>
      </form>
    </div>
  );
}