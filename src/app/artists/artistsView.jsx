import ArtistCard from "@/components/ArtistCard/ArtistCard";

export default function ArtistsView ({}) {

    return(
        <div className="flex flex-col justify-center items-center">
            <div className="text-primary-content w-11/12 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
                <ArtistCard testFollowed={true}/>
                <ArtistCard testFollowed={false}/>
                <ArtistCard/>
                <ArtistCard/>
                <ArtistCard/>
                <ArtistCard/>
                <ArtistCard/>
            </div>
        </div>
    )


};