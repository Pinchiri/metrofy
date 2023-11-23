import React from "react";

const Rating = ({ rating }) => {
  // Round the rating number
  const roundedRating = Math.round(rating);

  //Function to determine which stars to color
  const generateStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1;
      const isStarActive = starNumber <= roundedRating;

      return (
        <input
          key={`star-${starNumber}`}
          type="radio"
          name="rating-9"
          className={`mask mask-star-2 ${
            isStarActive ? "bg-warning" : "bg-black"
          }`}
          checked={starNumber === roundedRating}
        />
      );
    });
  };

  return <div className="rating rating-md">{generateStars()}</div>;
};

export default Rating;
