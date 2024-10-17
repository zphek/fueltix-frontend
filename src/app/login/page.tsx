"use client";

import sendRequest from "@/utilities/sendRequest";
import { useState, FormEvent, ChangeEvent } from "react";

type Form = {
  email: string;
  password: string;
};

const Login = () => {
  const [formData, setFormData] = useState<Form>({
    email: "",
    password: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSuccess(false);
    setError(null);

    try {
      await sendRequest("/auth/login", "POST", formData);
      setShowSuccess(true);
      window.location.href="/dashboard"
    } catch (error) {
      console.error(error);
      setError("Error al iniciar sesión. Por favor, intente nuevamente.");
    }
  };

  return (
    <div>
      <div className="flex w-full max-h-screen justify-center">
        <div className="w-2/4 max-h-screen">
          <img src="fuel.png" alt="login" />
        </div>
        <div className="w-3/5 px-24 mt-24 flex flex-col justify-center">
          <h1 className="text-6xl text-primary text-center">
            ¡Bienvenido/a a FuelTix!
          </h1>
          <form
            className="flex flex-col justify-center mt-12 px-24"
            onSubmit={handleSubmit}
          >
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3"
                role="alert"
              >
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <label htmlFor="email" className="my-3 text-primary font-bold">
              Usuario o correo electrónico
            </label>
            <input
              type="text"
              name="email"
              placeholder="Ingrese su usuario o correo electrónico"
              className="primary-input w-full"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="password"
              className="my-3 text-primary font-bold mt-10"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="Ingrese su contraseña"
              className="primary-input w-full"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="primary-button my-4 mt-8 font-bold mx-auto"
            >
              Iniciar sesión
            </button>
            <a href="/retrieve" className="text-primaryD mx-auto font-light">
              Recuperar contraseña
            </a>
          </form>
        </div>
      </div>
      {showSuccess && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">¡Éxito! </strong>
          <span className="block sm:inline">
            Has iniciado sesión exitosamente.
          </span>
        </div>
      )}
    </div>
  );
};

export default Login;
