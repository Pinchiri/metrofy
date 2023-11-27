"use client";

import React from "react";
import heroImage from "../../assets/hero-metrofy.png";
import { useRouter } from "next/navigation";
import { genresURL } from "@/constants/urls";
import HeroView from "./HeroView";

const Hero = () => {
  const router = useRouter();

  const title = "Explora el ritmo de tu vida";
  const body =
    "Descubre las últimas tendencias, coloca tus canciones preferidas como favoritas y sumérgete en el universo musical que te apasiona";

  const imageBlurData = "LVExU~ayMyWB~Bf6RjayJAj[baoe";

  const buttonClick = () => {
    router.push(genresURL);
  };

  return (
    <HeroView
      title={title}
      body={body}
      onClick={buttonClick}
      image={heroImage.src}
      imageBlurData={imageBlurData}
    />
  );
};

export default Hero;
