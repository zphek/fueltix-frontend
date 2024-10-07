const Login = () => {
  return (
    <form>
      <div className="flex w-full justify-center">
        <div className="w-3/5">
          <img src="fuel.png" alt="login" />
        </div>
        <div className="w-2/5">
          <h1 className="text-6xl text-primary">¡Bienvenido/a! a FuelTix!</h1>
          <div className="flex flex-col justify-center">
            <label htmlFor="email" className="my-3">
              Usuario o correo electrónico
            </label>
            <input
              type="text"
              placeholder="Ingrese su usuario o correo electrónico"
              className="primary-input w-full"
              id="email"
            />
            <label htmlFor="password" className="my-3">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              className="primary-input  w-full"
              id="password"
            />
            <button className="primary-button my-4">Iniciar sesión</button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default Login;
