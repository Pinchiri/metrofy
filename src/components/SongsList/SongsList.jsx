import React from "react";
import SongCard from "../SongCard/SongCard";

const SongsList = ({ songsList, currentUser, setEnhancedSongs }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-4 lg:gap-10 my-10">
      {songsList.map((song, index) => (
        <SongCard
          id={index}
          song={song}
          enhancedSongs={songsList}
          currentUser={currentUser}
          setEnhancedSongs={setEnhancedSongs}
        />
      ))}
    </div>
  );
};

export default SongsList;
