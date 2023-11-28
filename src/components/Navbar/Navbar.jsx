"use client";
import React from "react";
import NavbarView from "./NavbarView";
import { exploreURL, genresURL, artistsURL, homeURL, loginURL } from "@/constants/urls";
import { useUserData } from "@/context/userContext";
import { auth } from "../../../firebase";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const { currentUser, isUserLoading, setCurrentUser, setIsUserLoading } =
    useUserData();
  const router = useRouter();

  const handleAuth = async () => {
    if (currentUser) {
      try {
        setIsUserLoading(true);
        await signOut(auth);
        setCurrentUser(null);
        setIsUserLoading(false);
        router.push(homeURL);
      } catch (error) {
        console.error("Error during logout", error);
      }
    } else {
      router.push(loginURL);
    }
  };

  const sidebarOptions = [
    {
      label: "Géneros",
      link: genresURL,
    },
    {
      label: "Artistas",
      link: artistsURL
    },
  ];
  return (
    <NavbarView
      sidebarOptions={sidebarOptions}
      handleAuth={handleAuth}
      profilePicture={currentUser?.photoURL}
      user={currentUser}
      isUserLoading={isUserLoading}
    />
  );
};

export default Navbar;
