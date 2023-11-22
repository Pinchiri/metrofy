"use client";

const LoginView = ({ logGoogleUser }) => {
  return (
    <>
      
      <div className="ml-6  mt-20 lg:pt-8 flex flex-col items-center justify-center gap-6">
       
        <h1 className="font-['B612'] font-bold pt-5 text-3xl">
          MetroFY
        </h1>

        <button
          className="bg-manz-200 p-4 rounded-lg font-bold hover:scale-105 transition-all"
          onClick={logGoogleUser}
        >
           Inicia sesión en Spotify
        </button>
        <p className=" lg:w-1/4 text-xl text-center">
          {" "}
          Escucha los últimos temas musicales 
          más recientes, mantente siempre a la moda {" "}
        </p>
      </div>
    </>
  );
};

export default LoginView;