import Divider from "@/components/Divider/Divider";

const { default: SongCard } = require("@/components/SongCard/SongCard");

const CategorySongsView = ({
  enhancedSongs,
  currentUser,
  categoryName,
  setEnhancedSongs,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mt-20 mb-4">{categoryName}</h1>
      <Divider color="none" />
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-4 lg:gap-10 my-10">
        {enhancedSongs.map((song) => (
          <SongCard
            id={song.id}
            song={song}
            enhancedSongs={enhancedSongs}
            currentUser={currentUser}
            setEnhancedSongs={setEnhancedSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySongsView;
