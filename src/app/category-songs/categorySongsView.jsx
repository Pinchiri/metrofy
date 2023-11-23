
const CategorySongsView = ({ songs, handleLike, handleUnlike}) => {

    return (
        <div>
            {songs.map((song, index) => (
                <div className="flex flex-row gap-4" key={index}>
                    <p>{song.title} - {song.artist} </p>
                    {song.favorited
                        ? <button className="error text-white" onClick={() => handleUnlike(song)}> Eliminar </button>
                        : <button className="primary text-black" onClick={() => handleLike(song)}> LIKE </button>
                    }
                </div>
            ))}
        </div>
    );
};

export default CategorySongsView;
