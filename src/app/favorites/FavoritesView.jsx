import Divider from "@/components/Divider/Divider";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import SongsList from "@/components/SongsList/SongsList";
import React from "react";

const FavoritesView = ({
  favoriteSongs,
  setFavoriteSongs,
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
      {favoriteSongs.length > 0 && (
        <>
          <h1 className="text-5xl font-bold my-4 px-6 text-center leading-snug">
            {title}
          </h1>

          <Divider color="none" />

          <div className="w-full flex flex-col items-center justify-center">
            <SongsList
              songsList={favoriteSongs}
              setEnhancedSongs={setFavoriteSongs}
              currentUser={currentUser}
            />
          </div>
        </>
      )}
      {!isLoading && favoriteSongs.length < 1 && (
        <>
          <div className="hero min-h-screen -my-10">
            <div className="hero-overlay bg-opacity-100"></div>
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

export default FavoritesView;
