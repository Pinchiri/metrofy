"use client";
import React, { useState } from "react";
import SongCardView from "./SongCardView";

const SongCard = ({ title, gender, artist, duration, rating }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    //TODO - Implement Backend functionality
    setIsFavorite(!isFavorite);
  };

  return (
    <SongCardView
      title={title}
      gender={gender}
      artist={artist}
      duration={duration}
      rating={rating}
      isFavorite={isFavorite}
      handleFavorite={handleFavorite}
    />
  );
};

export default SongCard;
