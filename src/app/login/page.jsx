"use client";

import { useContext} from "react";
import { UserContext } from "@/context/userContext";
import { useRouter} from "next/navigation";
import { getDoc} from "firebase/firestore";
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../../firebase";
import LoginView from "./loginView";

export default function Login () {
    const { setCurrentUser } = useContext(UserContext);
    const router = useRouter();
   
    // Función para crear un usuario en Firestore o validar si existe
    const logGoogleUser = async () => {
        try {
            const { user } = await signInWithGooglePopup(); 
            //Aclaratoria en createUserDocumentFromAuth se llama a CreateUserNeo4J 
            const userDocRef = await createUserDocumentFromAuth(user);
            const docSnapshot = await getDoc(userDocRef);
            console.log(user.displayName, user.email)
    
            if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                setCurrentUser(userData);
                router.push("/explore");
            } 
        }
        catch (error) {
            console.log("Error al iniciar sesión con Google:", error);
        }
    };

    return (
        <>
            <LoginView
                logGoogleUser={logGoogleUser}

            />
        </>
    );
}