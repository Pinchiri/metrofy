import Divider from "@/components/Divider/Divider";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import SongCard from "@/components/SongCard/SongCard";

const CategorySongsView = ({
  enhancedSongs,
  currentUser,
  categoryName,
  setEnhancedSongs,
  goBack,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex flex-row items-center justify-between mt-10">
        {/* Position the arrow to the left */}
        <ArrowLeftIcon
          className="w-20 p-1 ml-6 hover:scale-105 transition-all cursor-pointer"
          onClick={goBack}
        />
        {/* Center the heading */}
        <h1 className="text-5xl font-bold my-4 text-center">{categoryName}</h1>
        {/* An invisible spacer to balance the flex space on the right */}
        <div className="w-20 opacity-0">
          {/* Invisible spacer to balance the flexbox alignment */}
        </div>
      </div>
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
