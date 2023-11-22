"use client";

const LoginView = ({ logGoogleUser }) => {
  return (
    <>
      
      <div className="ml-6  mt-20 lg:pt-8 flex flex-col items-center justify-center gap-6">
       
        <h1 className="font-['B612'] font-bold pt-5 text-3xl">
          Ingeniería Química.
        </h1>
        <h1 className="font-['B612'] font-bold pt-5 text-3xl text-center">
          Lab.Procesos de Separación.
        </h1>

        <button
          className="bg-manz-200 p-4 rounded-lg font-bold hover:scale-105 transition-all"
          onClick={logGoogleUser}
        >
     
          Iniciar con Google
        </button>
        <p className=" lg:w-1/4 text-xl text-center">
          {" "}
          ¡Inicia sesión con tu correo Unimet y disfruta de todos los beneficios
          de nuestros laboratorios!{" "}
        </p>
      </div>
    </>
  );
};

export default LoginView