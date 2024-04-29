import React from "react";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const content = [];

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) content.push(<IoStar key={i} />);
    else if (i === fullStars) content.push(<IoStarHalf key={i} />);
    else content.push(<IoStarOutline key={i} />);
  }
  return (
    <div className="flex items-center text-yellow-400">
      {content.map((item) => item)}
    </div>
  );
};

export default RatingStars;
