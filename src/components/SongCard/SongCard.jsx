"use client";
import React, { useState } from "react";
import SongCardView from "./SongCardView";
import {
  createFavoritedRelationship,
  deleteFavoritedRelationship,
  listenToSong,
} from "../../../neo4j";

const SongCard = ({
  song,
  enhancedSongs,
  setEnhancedSongs,
  currentUser,
  id,
}) => {
  const [isFavorite, setIsFavorite] = useState(song.favorited);

  const handleFavorite = async () => {
    try {
      if (!isFavorite) {
        const response = await createFavoritedRelationship(
          currentUser?.email,
          song.id
        );
        setEnhancedSongs(
          enhancedSongs.map((s) =>
            s.id === song.id ? { ...s, favorited: true } : s
          )
        );
      } else {
        const response = await deleteFavoritedRelationship(
          currentUser?.email,
          song.id
        );

        setEnhancedSongs(
          enhancedSongs.map((s) =>
            s.id === song.id ? { ...s, favorited: false } : s
          )
        );
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log("error: " + error);
    }
  };

  const handlePlay = async () => {
    console.log("Reproducing song:", song.title);
    await listenToSong(currentUser?.email, song.id);
  };

  return (
    <>
      <SongCardView
        songId={id}
        title={song.title}
        gender={song.gender}
        artist={song.artist}
        duration={song.duration}
        rating={song.rating}
        isFavorite={isFavorite}
        handleFavorite={handleFavorite}
        handlePlay={handlePlay}
      />
    </>
  );
};

export default SongCard;
