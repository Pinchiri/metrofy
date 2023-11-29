import React from "react";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";

const ArtistCardView = ({
    artist,
    isFollowed,
    handleFollow,
}) => {
    return (
    <div className="bg-primary px-2 py-2 pr-5 pl-5 font-bold text-xl flex justify-between items-center rounded-md transition-transform hover:bg-[#66D36E]">
        <p>{artist.name_artist}</p>
        <HeartIconOutline
            className={`text-primary-content w-12 hover:scale-105 transition-all cursor-pointer -mt-1 ${
                isFollowed ? "fill-[#ff0000] !text-[#ff0000]" : ""
              }`}
              onClick={handleFollow}
          />
    </div>
    )}

export default ArtistCardView;