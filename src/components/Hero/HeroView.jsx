import React from "react";
import Image from "next/image";

const HeroView = ({ title, body, onClick, image, imageBlurData }) => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="relative h-full w-full">
        <Image
          src={image}
          alt="Hero Background"
          fill={true}
          style={{ objectFit: "cover" }}
          loading="lazy"
          quality={100}
          placeholder="blur"
          blurDataURL={imageBlurData}
        />
      </div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">{title}</h1>
          <p className="mb-5">{body}</p>
          <button className="btn btn-primary" onClick={onClick}>
            Explorar
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroView;
