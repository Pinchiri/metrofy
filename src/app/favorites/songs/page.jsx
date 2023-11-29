"use client";
import React, { useEffect, useState } from "react";
import { useUserData } from "@/context/userContext";
import { getSongsWithFavoritedStatus } from "../../../../neo4j";
import FavoriteSongsView from "./FavoriteSongsView";
import { useRouter } from "next/navigation";
import { artistsURL, genresURL } from "@/constants/urls";
import artistsImage from "../../../assets/artists.jpg";

const FavoriteSongs = () => {
  const { currentUser } = useUserData();
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const title = "Canciones favoritas";

  const emptyFavoritesTitle =
    "¿Todavía no has colocado ninguna canción como favorita?";
  const emptyFavoritesBody =
    "Explora los géneros y artistas para encontrar tus canciones preferidas";

  const imageBlurData =
    "data:image/webp;base64,UklGRlQCAABXRUJQVlA4WAoAAAAgAAAABQAAAwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDhMZQAAAC8FwAAAf6A2ktRmCCHyEMrUqVrVhytEQds2bK7dP0QGamoiSVLqQszYxFl7r++FwvkPIJwY+7aGsX5BVz8/dvPnoUU1jVQdP9zL3wuHQCEbSdA+kMuwHqd1DOdxRBH9j/3LFBBhAA==";

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
      console.log(songs);
      setFavoriteSongs(songs.filter((song) => song.favorited));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFavoriteSongs();
    console.log("favoriteSongs", favoriteSongs);
  }, [currentUser]);

  useEffect(() => {}, [favoriteSongs]);

  return (
    <FavoriteSongsView
      favoriteSongs={favoriteSongs}
      setFavoriteSongs={setFavoriteSongs}
      currentUser={currentUser}
      title={title}
      emptyFavoritesTitle={emptyFavoritesTitle}
      emptyFavoritesBody={emptyFavoritesBody}
      onEmptyFavoritesClick={onEmptyFavoritesClick}
      isLoading={isLoading}
      emptyImage={artistsImage.src}
      emptyImageBlurData={imageBlurData}
    />
  );
};

export default FavoriteSongs;
