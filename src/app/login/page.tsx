"use client";

import sendRequest from "@/utilities/sendRequest";
import { Alert } from "@mui/material";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

type form = {
  email: string,
  password: string
}

const Login = () => {
  const [formData, setFormData] = useState<form>()

  const handleChange = (e:html)=>{

  }

  const handleSubmit = (e:any)=>{
    e.preventDefault();

    sendRequest("/auth/login", "POST", formData)
    .then((response)=>{
      console.log(response)
    })
    .catch((error)=>{
      console.log(error)
    })
  } 

  return (
    <div>
      <div className="flex w-full max-h-screen justify-center">
        <div className="w-2/4 max-h-screen">
          <img src="fuel.png" alt="login" />
        </div>
        <div className="w-3/5 px-24 mt-24 flex flex-col justify-center">
          <h1 className="text-6xl text-primary text-center">¡Bienvenido/a! a FuelTix!</h1>
          <form className="flex flex-col justify-center mt-12 px-24">
            <label htmlFor="email" className="my-3 text-primary font-bold">
              Usuario o correo electrónico
            </label>
            <input
              type="text"
              placeholder="Ingrese su usuario o correo electrónico"
              className="primary-input w-full"
              id="email"
            />
            <label
              htmlFor="password"
              className="my-3 text-primary font-bold mt-10"
            >
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              className="primary-input  w-full"
              id="password"
            />
            <button className="primary-button my-4 mt-8 font-bold mx-auto">
              Iniciar sesión
            </button>
            <a href="/retrieve" className="text-primaryD mx-auto font-light">
              Recuperar contraseña
            </a>
          </form>
        </div>
      </div>

      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        Has iniciado sesi&oacute;n exitosamente!
      </Alert>
    </div>
  );
};
export default Login;
