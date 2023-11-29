import Divider from "@/components/Divider/Divider";
import SongsList from "@/components/SongsList/SongsList";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import Link from "next/link";
import { recommendedURL } from "@/constants/urls";

const RecommendedSongsView = ({
  category,
  categoryName,
  songs,
  country,
  countryGenre,
  listSongs,
  setRecommendedSongs,
  currentUser,
  isLoading,
  recommendationType,
}) => {

  if (category !== "countryGenre") {
    if (!categoryName || songs.length === 0) {
      return <div></div>;
    }
  } else {
    if (!country || !countryGenre || listSongs.length === 0) {
      return <div></div>;
    }
  }

  // Determinar el mensaje a mostrar según la categoría (género o artista)
  let message = "";
  if (category === "genre") {
    message = `Descubre joyas en ${categoryName} Sólo Para Ti`;
  } else if (category === "artist") {
    message = `¿Te gusta ${categoryName}? Aquí hay más`;
  } else if (category === "countryGenre") {
    message = `Explora lo mejor de ${countryGenre}, Popular en ${country}`;
  }

  // Determinar la lista de canciones a mostrar
  let songsToDisplay = [];
  if (category === "genre" || category === "artist") {
    songsToDisplay = songs;
  } else if (category === "countryGenre") {
    songsToDisplay = listSongs;
  }

  if (songsToDisplay && songsToDisplay.length > 2) {
    songsToDisplay = songsToDisplay.slice(0, 4);
  }

  return (
    <div className="w-full flex flex-col justify-center mt-36">
      {isLoading && (
        <div className="w-full max-w-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && (
        <div className="w-full flex flex-col items-center justify-center ">
          <h1 className="text-5xl font-bold my-4 px-6 text-center">
            {message}
          </h1>

          <Divider color="none" />

          <div className="w-full flex flex-row items-end justify-end pr-14">
            {
              (country && countryGenre) ? (
                <Link
                  href={{
                    pathname: recommendedURL,
                    query: {
                      category: category,
                      recommendation: recommendationType,
                      country: country,
                      countryGenre: countryGenre,
                    }
                  }}
                  key={recommendationType}
                >
                  <h3 className="text-2xl font-bold my-4 px-6 text-right">
                    Ver más
                  </h3>
                </Link>
              ) : (
                <Link
                  href={{
                    pathname: recommendedURL,
                    query: {
                      category: category,
                      recommendation: recommendationType,
                    }
                  }}
                  key={recommendationType}
                >
                  <h3 className="text-2xl font-bold my-4 px-6 text-right">
                    Ver más
                  </h3>
                </Link>
              )
            }

          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <SongsList
              songsList={songsToDisplay}
              setEnhancedSongs={setRecommendedSongs}
              currentUser={currentUser}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendedSongsView;
