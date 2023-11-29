import Divider from "@/components/Divider/Divider";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import SongsList from "@/components/SongsList/SongsList";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";


const RecommendedView = ({
    currentUser,
    songsToDisplay,
    setRecommendedSongs,
    goBack,
    message,
    isLoading
}) => {
    return (
        <>
            {isLoading && (
                <>
                    <div className="w-full flex flex-row items-start justify-between mt-10">
                        <ArrowLeftIcon
                            className="w-20 p-1 ml-6 hover:scale-105 transition-all cursor-pointer"
                            onClick={goBack}
                        />
                        <div className="w-20 p-1 mr-6"> {/* Placeholder for spacing */} </div>
                    </div>

                    <div className="w-full max-w-screen flex items-center justify-center">
                        <LoadingSpinner />
                    </div>
                </>
            )}

            {!isLoading &&
                (
                    <div className="w-full flex flex-col items-center justify-center">
                        <div className="w-full flex flex-row items-start justify-between mt-10">
                            <ArrowLeftIcon
                                className="w-20 p-1 ml-6 hover:scale-105 transition-all cursor-pointer"
                                onClick={goBack}
                            />

                            <h1 className="text-5xl font-bold my-4 text-center flex-1">{message}</h1>

                            <div className="w-20 p-1 mr-6"> {/* Placeholder for spacing */} </div>
                        </div>

                        <Divider color="white" className="w-full" />

                        <SongsList
                            songsList={songsToDisplay}
                            setEnhancedSongs={setRecommendedSongs}
                            currentUser={currentUser}
                        />
                    </div>
                )
            }

        </>



    );

};

export default RecommendedView;
