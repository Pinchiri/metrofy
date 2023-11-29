import ArtistCard from "@/components/ArtistCard/ArtistCard";
import Divider from "@/components/Divider/Divider";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import SongsList from "@/components/SongsList/SongsList";
import Image from "next/image";
import React from "react";

const FavoriteArtistsView = ({
  favoriteArtists,
  emptyImage,
  emptyImageBlurData,
  setFavoriteArtists,
  currentUser,
  title,
  emptyFavoritesTitle,
  emptyFavoritesBody,
  onEmptyFavoritesClick,
  isLoading,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center my-10">
      {isLoading && (
        <div className="w-full max-w-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      {favoriteArtists.length > 0 && (
        <>
          <h1 className="text-5xl font-bold my-4 px-6 text-center leading-snug">
            {title}
          </h1>

          <Divider color="none" />

          <div className="flex flex-col justify-center items-center">
            <div className="text-primary-content w-11/12 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
              {favoriteArtists &&
                favoriteArtists.map((artist, index) => (
                  <ArtistCard
                    key={index}
                    artist={artist}
                    currentUser={currentUser}
                  />
                ))}
            </div>
          </div>
        </>
      )}
      {!isLoading && favoriteArtists.length < 1 && (
        <>
          <div className="hero min-h-screen -my-10">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="relative h-full w-full">
              <Image
                src={emptyImage}
                alt="Artists Background"
                fill={true}
                style={{ objectFit: "cover" }}
                loading="lazy"
                quality={100}
                placeholder="blur"
                blurDataURL={emptyImageBlurData}
              />
            </div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-xl">
                <h1 className="mb-5 text-3xl lg:text-5xl font-bold">
                  {emptyFavoritesTitle}
                </h1>
                <p className="mb-5">{emptyFavoritesBody}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    onEmptyFavoritesClick(0);
                  }}
                >
                  Explorar Géneros
                </button>
                <button
                  className="btn btn-primary ml-10"
                  onClick={() => {
                    onEmptyFavoritesClick(1);
                  }}
                >
                  Explorar Artistas
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FavoriteArtistsView;
