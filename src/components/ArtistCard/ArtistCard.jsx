"use client";
import React, { useState } from "react";
import { useToaster } from "../Toaster/hooks/useToaster";
import Toaster from "../Toaster/Toaster";
import { createUserFollowsArtist, deleteFavoriteArtist } from "../../../neo4j";

import ArtistCardView from "./ArtistCardView";

const ArtistCard = ({ artist, currentUser }) => {
  const [isFollowed, setIsFollowed] = useState(artist.followed);
  const { isVisible, showToast, toasterProperties, setToasterProperties } =
    useToaster();

  const handleFollow = async () => {
    try {
      if (!isFollowed) {
        const response = await createUserFollowsArtist(
          currentUser?.email,
          artist.name_artist
        );
        setToasterProperties({
          toasterMessage: "Se ha comenzado a seguir al artista!",
          typeColor: "success",
        });
        setIsFollowed(!isFollowed);
        showToast();
      } else {
        const response = await deleteFavoriteArtist(
          currentUser?.email,
          artist.name_artist
        );
        setToasterProperties({
          toasterMessage: "Se ha dejado de seguir al artista!",
          typeColor: "success",
        });
        setIsFollowed(!isFollowed);
        showToast();
      }
    } catch (error) {
      setToasterProperties({
        toasterMessage: "Ha ocurrido un error, por favor inténtelo de nuevo",
        typeColor: "error",
      });
      showToast();
      console.log("error: " + error);
    }
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
      <ArtistCardView
        artist={artist}
        isFollowed={isFollowed}
        handleFollow={handleFollow}
      />
    </>
  );
};

export default ArtistCard;
