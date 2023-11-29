"use client";

import { useUserData } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { getDoc } from "firebase/firestore";
import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
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
  const [isUserLoading, setIsUserLoading] = useState(false);

  // Función para crear un usuario en Firestore o validar si existe
  const logGoogleUser = async () => {
    setIsUserLoading(true);
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
      setIsUserLoading(false);


    } catch (error) {
      setIsUserLoading(false);
      setToasterProperties({
        toasterMessage: "Ha ocurrido un error al iniciar sesión",
        typeColor: "error",
      });
      showToast();
      setCurrentUser(null);
      console.log("Error al iniciar sesión con Google:", error);
    }
    setIsUserLoading(false);
  };

  if (isUserLoading) {
    return <div className="flex justify-center items-center h-screen">
      <LoadingSpinner />
    </div>
  }

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
