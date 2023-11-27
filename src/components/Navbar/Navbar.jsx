"use client";
import React from "react";
import NavbarView from "./NavbarView";
import { exploreURL, genresURL, homeURL, loginURL } from "@/constants/urls";
import { useUserData } from "@/context/userContext";
import { signOutUser } from "../../../firebase";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { currentUser, isUserLoading, setCurrentUser } = useUserData();
  const router = useRouter();

  console.log(currentUser);

  const handleAuth = async () => {
    if (currentUser) {
      try {
        await signOutUser();
        setCurrentUser({});
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
