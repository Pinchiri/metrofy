"use client";
import React, { useState } from "react";
import SongCardView from "./SongCardView";

const SongCard = ({
  title,
  gender,
  artist,
  duration,
  rating,
  favorite = false,
}) => {
  const [isFavorite, setIsFavorite] = useState(favorite);

  const handleFavorite = () => {
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
