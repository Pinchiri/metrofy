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

  const handlePlay = () => {
    //TODO - Add functionality
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
      handlePlay={handlePlay}
    />
  );
};

export default SongCard;
