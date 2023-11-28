"use client";
import React, { useEffect, useState } from "react";
import { useUserData } from "@/context/userContext";
import { getSongsWithFavoritedStatus } from "../../../neo4j";
import FavoritesView from "./FavoritesView";
import { useRouter } from "next/navigation";
import { artistsURL, genresURL } from "@/constants/urls";

const Favorites = () => {
  const { currentUser } = useUserData();
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const title = "Canciones favoritas";

  const emptyFavoritesTitle =
    "¿Todavía no has colocado ninguna canción como favorita?";
  const emptyFavoritesBody =
    "Explora los géneros y artistas para encontrar tus canciones preferidas";

  const onEmptyFavoritesClick = (option) => {
    switch (option) {
      case 0:
        router.push(genresURL);
        break;

      case 1:
        router.push(artistsURL);
        break;

      default:
        break;
    }
  };

  const fetchFavoriteSongs = async () => {
    setIsLoading(true);
    if (currentUser?.email) {
      const songs = await getSongsWithFavoritedStatus(currentUser.email);
      setFavoriteSongs(songs.filter((song) => song.favorited));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFavoriteSongs();
    console.log("favoriteSongs", favoriteSongs);
  }, [currentUser]);

  useEffect(() => { }, [favoriteSongs]);

  return (
    <FavoritesView
      favoriteSongs={favoriteSongs}
      setFavoriteSongs={setFavoriteSongs}
      currentUser={currentUser}
      title={title}
      emptyFavoritesTitle={emptyFavoritesTitle}
      emptyFavoritesBody={emptyFavoritesBody}
      onEmptyFavoritesClick={onEmptyFavoritesClick}
      isLoading={isLoading}
    />
  );
};

export default Favorites;
