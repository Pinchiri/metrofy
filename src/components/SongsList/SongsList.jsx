import React from "react";
import SongCard from "../SongCard/SongCard";
import { useToaster } from "../Toaster/hooks/useToaster";
import Toaster from "../Toaster/Toaster";

const SongsList = ({ songsList, currentUser, setEnhancedSongs }) => {
  const { isVisible, showToast, toasterProperties, setToasterProperties } =
    useToaster();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-4 lg:gap-10 my-10">
      {isVisible && (
        <Toaster
          message={toasterProperties.toasterMessage}
          isVisible={isVisible}
          typeColor={toasterProperties.typeColor}
        />
      )}
      {songsList.map((song) => (
        <SongCard
          key={song.id}
          song={song}
          enhancedSongs={songsList}
          currentUser={currentUser}
          setEnhancedSongs={setEnhancedSongs}
          showToast={showToast}
          setToasterProperties={setToasterProperties}
        />
      ))}
    </div>
  );
};

export default SongsList;
