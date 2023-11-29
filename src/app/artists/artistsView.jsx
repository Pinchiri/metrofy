import ArtistCard from "@/components/ArtistCard/ArtistCard";
import Divider from "@/components/Divider/Divider";

export default function ArtistsView({ artistsList, currentUser }) {
  return (
    <>
      <h1 className="text-5xl font-bold my-4 px-6 text-center">
        Artistas más populares
      </h1>
      <Divider color="none" />

      <div className="flex flex-col justify-center items-center">
        <div className="text-primary-content w-11/12 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
          {artistsList &&
            artistsList.map((artist, index) => (
              <ArtistCard
                key={index}
                artist={artist}
                currentUser={currentUser}
              />
            ))}
        </div>
      </div>
    </>
  );
}
