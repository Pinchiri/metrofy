import Divider from "@/components/Divider/Divider";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import SongsList from "@/components/SongsList/SongsList";

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
        <ArrowLeftIcon
          className="w-20 p-1 ml-6 hover:scale-105 transition-all cursor-pointer"
          onClick={goBack}
        />
        <h1 className="text-5xl font-bold my-4 text-center">{categoryName}</h1>
        <div className="w-20 opacity-0"></div>
      </div>

      <Divider color="none" />

      <SongsList
        songsList={enhancedSongs}
        setEnhancedSongs={setEnhancedSongs}
        currentUser={currentUser}
      />
    </div>
  );
};

export default CategorySongsView;
