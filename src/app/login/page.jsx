"use client";

import { useUserData } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { getDoc } from "firebase/firestore";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../../firebase";
import LoginView from "./loginView";
import { genresURL } from "@/constants/urls";
import { useToaster } from "@/components/Toaster/hooks/useToaster";

export default function Login() {
  const { setCurrentUser } = useUserData();
  const router = useRouter();
  const { isVisible, showToast, toasterProperties, setToasterProperties } =
    useToaster();

  // Función para crear un usuario en Firestore o validar si existe
  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      setCurrentUser(user);
      //Aclaratoria en createUserDocumentFromAuth se llama a CreateUserNeo4J
      const userDocRef = await createUserDocumentFromAuth(user);
      const docSnapshot = await getDoc(userDocRef);

      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();

        router.push(genresURL);
      }
    } catch (error) {
      setToasterProperties({
        toasterMessage: "Ha ocurrido un error al iniciar sesión",
        typeColor: "error",
      });
      showToast();
      setCurrentUser(null);
      console.log("Error al iniciar sesión con Google:", error);
    }
  };

  return (
    <>
      <LoginView
        logGoogleUser={logGoogleUser}
        isToasterVisible={isVisible}
        toasterProperties={toasterProperties}
      />
    </>
  );
}
