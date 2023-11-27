import Divider from "@/components/Divider/Divider";
import SongsList from "@/components/SongsList/SongsList";

const RecommendedSongsView = ({
  category,
  categoryName,
  songs,
  country,
  countryGenre,
  listSongs,
}) => {
  if (!categoryName || songs.length === 0) {
    return <div>No hay recomendaciones disponibles.</div>;
  }

  // Determinar el mensaje a mostrar según la categoría (género o artista)
  let message = "";
  if (category === "genre") {
    message = `Descubre joyas en ${categoryName} Sólo Para Ti`;
  } else if (category === "artist") {
    message = `¿Te gusta ${categoryName}? Aquí hay más`;
  } else if (category === "countryGenre") {
    message = `Explora lo Mejor de ${countryGenre} Popular en ${country}`;
  }

  // Determinar la lista de canciones a mostrar
  let songsToDisplay = [];
  if (category === "genre" || category === "artist") {
    songsToDisplay = songs;
  } else if (category === "countryGenre") {
    songsToDisplay = listSongs;
  }

  return (
    <div className="w-full flex flex-col justify-center mt-40">
      <h1 className="text-5xl font-bold my-4 px-6 text-center leading-snug">
        {message}
      </h1>

      <Divider color="none" />

      <div className="w-full flex flex-col items-center justify-center">
        <SongsList songsList={songsToDisplay} />
      </div>
    </div>
  );
};

export default RecommendedSongsView;
