"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getDoc } from "firebase/firestore";
import { UserContext } from "@/context/userContext";
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../../firebase";
import LoginView from "./loginView";


const Login = () => {
    const { setCurrentUser } = useContext(UserContext);
    const router = useRouter();


    const logGoogleUser = async () => {
        try {
            const { user } = await signInWithGooglePopup();

            const userDocRef = await createUserDocumentFromAuth(user);
            const docSnapshot = await getDoc(userDocRef);
            if (docSnapshot.exists()) {
                const userData = docSnapshot.data();

                router.push("/")
            }
            else {
                router.push("/")
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


    export default Login;