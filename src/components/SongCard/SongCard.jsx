"use client";
import React, { useState } from "react";
import SongCardView from "./SongCardView";
import {
  createFavoritedRelationship,
  deleteFavoritedRelationship,
  listenToSong,
} from "../../../neo4j";
import { useToaster } from "../Toaster/hooks/useToaster";
import Toaster from "../Toaster/Toaster";

const SongCard = ({
  song,
  enhancedSongs,
  setEnhancedSongs,
  currentUser,
  id,
}) => {
  const [isFavorite, setIsFavorite] = useState(song.favorited);
  const { isVisible, showToast, toasterProperties, setToasterProperties } =
    useToaster();

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
        setToasterProperties({
          toasterMessage: "Se ha agregado la canción a favoritos!",
          typeColor: "success",
        });
        showToast();
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
        setToasterProperties({
          toasterMessage: "Se ha eliminado la canción de favoritos!",
          typeColor: "success",
        });
        showToast();
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      setToasterProperties({
        toasterMessage: "Ha ocurrido un error, por favor inténtelo de nuevo",
        typeColor: "error",
      });
      showToast();
      console.log("error: " + error);
    }
  };

  const handlePlay = async () => {
    console.log("Reproducing song:", song.title);
    await listenToSong(currentUser?.email, song.id);
  };

  return (
    <>
      {isVisible && (
        <Toaster
          message={toasterProperties.toasterMessage}
          isVisible={isVisible}
          typeColor={toasterProperties.typeColor}
        />
      )}
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
