import React from "react";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import Rating from "../Rating/Rating";

import { PlayIcon } from "@heroicons/react/24/solid";

const SongCardView = ({
  title,
  gender,
  artist,
  duration,
  rating,
  isFavorite,
  handleFavorite,
  handlePlay,
}) => {
  return (
    <div className="card card-compact lg:card-normal w-50 lg:w-70 bg-primary text-primary-content z-0">
      <div className="card-body flex flex-row gap-28 lg:gap-24">
        <div className="flex flex-col font-semibold">
          <h2 className="card-title font-bold">{title}</h2>
          <h1 className="">{artist}</h1>
          <p className="">{gender}</p>
          <p className="mt-4 ">{duration} min</p>
          <div className="mt-2 -ml-1 lg:-ml-2">
            <Rating rating={rating} />
          </div>
        </div>
        <div className="flex flex-col">
          <HeartIconOutline
            className={`text-primary-content w-12 hover:scale-105 transition-all cursor-pointer -mt-1 ${
              isFavorite ? "fill-[#ff0000] text-[#ff0000]" : ""
            }`}
            onClick={handleFavorite}
          />
          <button
            className="btn btn-circle btn-md mt-20 hover:scale-105"
            onClick={handlePlay}
          >
            <PlayIcon className="text-neutral-content w-32 p-1 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongCardView;
