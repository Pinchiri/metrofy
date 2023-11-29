"use client";
import React, { useEffect, useState } from "react";
import { useUserData } from "@/context/userContext";
import { getFavoriteArtists } from "../../../../neo4j";
import { useRouter } from "next/navigation";
import { artistsURL, genresURL } from "@/constants/urls";
import FavoriteArtistsView from "./FavoriteArtistsView";
import artistsImage from "../../../assets/artists.jpg";

const FavoriteArtists = () => {
  const { currentUser } = useUserData();
  const [favoriteArtists, setFavoriteArtists] = useState([]);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const title = "Artistas favoritos";

  const emptyFavoritesTitle =
    "¿Todavía no has colocado ningún artista como favorito?";
  const emptyFavoritesBody =
    "Explora los géneros y artistas para encontrar tus preferidos";

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

  const fetchFavoriteArtists = async () => {
    setIsLoading(true);
    if (currentUser?.email) {
      const artists = await getFavoriteArtists(currentUser.email);
      console.log(artists);
      setFavoriteArtists(artists.filter((artist) => artist.followed));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFavoriteArtists();
    console.log("favoriteArtists", favoriteArtists);
  }, [currentUser]);

  useEffect(() => {}, [favoriteArtists]);

  return (
    <FavoriteArtistsView
      favoriteArtists={favoriteArtists}
      setFavoriteArtists={setFavoriteArtists}
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

export default FavoriteArtists;
