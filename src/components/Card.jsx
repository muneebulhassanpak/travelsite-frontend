import React from "react";
import card from "../assets/card.png";
import { Link } from "react-router-dom";

const Card = ({ price, location, image, id }) => {
  return (
    <Link
      to={`/All-Trips/${id}`}
      className="h-80 min-w-[250px] bg-cover overflow-hidden rounded-lg w-[95%] sm:w-[30%] my-5 sm:my-10 relative hover:shadow-md hover:-translate-y-4 hover:scale-105 transition-transform cursor-pointer ease-in"
    >
      <img src={image} alt={location} className="w-full h-full object-cover" />
      <div className="absolute right-3 top-3 px-4 py-2 rounded-md bg-white">
        {location}
      </div>
      <div className="absolute left-3 bottom-3 px-4 py-2 rounded-md bg-white">
        {price} PKR
      </div>
    </Link>
  );
};

export default Card;
