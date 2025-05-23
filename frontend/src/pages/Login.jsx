import React, { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remindMe, setRemindMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    // Revisar si hay usuario guardado en localStorage
    const storedUser = localStorage.getItem("loggedUser");
    const storedRemindMe = localStorage.getItem("remindMe");

    if (storedUser && storedRemindMe === "true") {
      // Si hay usuario y la opción "Recordar mi usuario" está activada
      setUsername(storedUser);
      setRemindMe(true);
      // Redirigir directamente al dashboard
      window.location.href = "/dashboard"; // Redirigir al dashboard si el usuario ya está autenticado
    } else {
      // Si no, revisar en sessionStorage
      const tempUser = sessionStorage.getItem("tempUser");
      if (tempUser) {
        setUsername(tempUser);
      }
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setUsernameError("");
    setPasswordError("");

    // Validaciones de campos vacíos
    if (!username) {
      setUsernameError("Ingrese su nombre de usuario");
      return;
    }
    if (!password) {
      setPasswordError("Ingrese su contraseña");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/gestion/api/usuarios/"
      );
      if (!response.ok) {
        throw new Error("Error en la red");
      }
      const data = await response.json();

      const foundUser = data.find(
        (user) => user.username === username && user.password === password
      );
      if (foundUser) {
        console.log("Login exitoso:", foundUser);

        // Guardar el rol del usuario en localStorage o sessionStorage
        if (remindMe) {
          localStorage.setItem("loggedUser", foundUser.username);
          localStorage.setItem("remindMe", "true");
          localStorage.setItem("userRole", foundUser.role); // Guardamos el rol también
        } else {
          sessionStorage.setItem("tempUser", foundUser.username);
          sessionStorage.setItem("userRole", foundUser.role); // Guardamos el rol también
          localStorage.removeItem("loggedUser");
          localStorage.removeItem("remindMe");
          localStorage.removeItem("userRole");
        }

        // Redirigir al dashboard, sin importar si es admin o no
        window.location.href = "/dashboard"; // Redirige siempre al dashboard
      } else {
        setErrorMsg("Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
      setErrorMsg("Error al conectar con la API");
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-r from-[#f0f0f0] to-[#d3d3d3]">
      <div className="absolute top-10 flex justify-center w-full z-20">
        <img src="/ciateq.png" alt="CIATEQ Logo" className="h-24" />
      </div>
      <div className="relative w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg z-30">
        <h2 className="text-center text-2xl font-bold text-[#92283f]">
          Iniciar Sesión
        </h2>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-gray-700">
              Nombre de usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              placeholder="Nombre de usuario"
              className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:ring-[#92283f] focus:border-[#92283f]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameError && <p className="text-red-500">{usernameError}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Contraseña"
              className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:ring-[#92283f] focus:border-[#92283f]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-5 h-5 text-[#92283f] border-gray-500 rounded focus:ring-[#92283f]"
              onChange={(e) => {
                setRemindMe(!remindMe);
              }}
              checked={remindMe}
            />
            <span className="text-gray-700">Recordar mi usuario</span>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-[#92283f] rounded-md hover:bg-[#701d2f] transition"
          >
            Iniciar sesión
          </button>
        </form>
        {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
      </div>
    </div>
  );
}

export default Login;
