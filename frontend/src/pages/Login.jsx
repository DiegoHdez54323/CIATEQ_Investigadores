import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      // Realiza una petición GET al endpoint de usuarios
      const response = await fetch(
        "http://127.0.0.1:8000/gestion/api/usuarios/"
      );
      if (!response.ok) {
        throw new Error("Error en la red");
      }
      const data = await response.json();
      // Valida que exista un usuario que coincida con el username y password
      const foundUser = data.find(
        (user) => user.username === username && user.password === password
      );
      if (foundUser) {
        console.log("Login exitoso:", foundUser);
        // Aquí podrías redirigir al usuario o guardar la información en el estado global/localStorage, etc.
      } else {
        setErrorMsg("Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
      setErrorMsg("Error al conectar con la API");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Iniciar Sesión
        </h2>
        {errorMsg && <div className="mb-4 text-red-500">{errorMsg}</div>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Nombre de usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                placeholder="Nombre de usuario"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Contraseña"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
