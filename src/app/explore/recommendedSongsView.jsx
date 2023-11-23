const RecommendedSongsView = ({ category, categoryName, songs, country, countryGenre, listSongs }) => {
    if (!categoryName || songs.length === 0) {
        return <div>No hay recomendaciones disponibles.</div>;
    }

    // Determinar el mensaje a mostrar según la categoría (género o artista)
    let message = '';
    if (category === 'genre') {
        message = `Porque escuchaste el género ${categoryName}, te recomendamos:`;
    } else if (category === 'artist') {
        message = `Porque te gusta ${categoryName}, te recomendamos:`;
    } else if (category === 'countryGenre') {
        message = `Porque en ${country} escuchan ${countryGenre}, te recomendamos:`;
    }

    // Determinar la lista de canciones a mostrar
    let songsToDisplay = [];
    if (category === 'genre' || category === 'artist') {
        songsToDisplay = songs;
    } else if (category === 'countryGenre') {
        songsToDisplay = listSongs;
    }

    return (
        <div>
            <h2>{message}</h2>
            {songsToDisplay.map((song, index) => (
                <div key={index}>
                    <p>{song.title} - {song.artist}</p>
                </div>
            ))}
        </div>
    );
};

export default RecommendedSongsView;
