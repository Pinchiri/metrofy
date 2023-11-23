import React from "react";
import NavbarView from "./NavbarView";
import { exploreURL, genresURL, myFavoritesURL } from "@/constants/urls";

const Navbar = () => {
  const sidebarOptions = [
    {
      label: "Genres",
      link: genresURL,
    },
    {
      label: "My Favorites",
      link: myFavoritesURL,
    },
  ];
  return <NavbarView sidebarOptions={sidebarOptions} />;
};

export default Navbar;
