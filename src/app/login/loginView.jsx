import Toaster from "@/components/Toaster/Toaster";

const LoginView = ({ logGoogleUser, isToasterVisible, toasterProperties }) => {
  return (
    <>
      {isToasterVisible && (
        <Toaster
          message={toasterProperties.toasterMessage}
          isVisible={isToasterVisible}
          typeColor={toasterProperties.typeColor}
        />
      )}
      <div className="ml-6 mt-20 text-center px-4 lg:pt-8 flex flex-col items-center justify-center gap-12">
        <h1 className="font-['Inter'] font-bold pt-5 text-5xl">
          Inicia sesión en Metrofy
        </h1>

        <button
          className="bg-primary text-black py-4 px-8 rounded-3xl font-bold hover:scale-105 transition-all"
          onClick={logGoogleUser}
        >
          Continuar con Google
        </button>
        <p className=" lg:w-1/4 text-xl text-center">
          {" "}
          Escucha los últimos temas musicales más recientes, mantente siempre a
          la moda{" "}
        </p>
      </div>
    </>
  );
};

export default LoginView;
