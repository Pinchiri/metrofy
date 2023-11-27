
const CategorySongsView = ({ songs, handleLike, handleUnlike, handleReproduce}) => {

    return (
        <div>
            {songs.map((song, index) => (
                <div className="flex flex-row gap-4" key={index}>
                    <p>{song.title} - {song.artist} </p>
                    {song.favorited
                        ? <button className="error text-white" onClick={() => handleUnlike(song)}> Eliminar </button>
                        : <button className=" text-white" onClick={() => handleLike(song)}> LIKE </button>
                    }
                    <button className="danger text-white" onClick={() => handleReproduce(song)}> BOTON REPRODUCIR -- ARISTA LISTENED </button>
                </div>
            ))}
        </div>
    );
};

export default CategorySongsView;
