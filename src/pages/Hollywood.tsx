import React from "react";
import BingoDobleMusical from "../BingoDobleMusical";
import songs from "../assets/hollywood";
import { MdMovieCreation } from "react-icons/md";

const Hollywood = () => {
  return (
    <div>
      <h2 className="absolute right-16 top-36 text-4xl font-semibold flex gap-4">
        Quina Hollywood <MdMovieCreation />
      </h2>
      <BingoDobleMusical songs={songs} maxNumber={70} />
    </div>
  );
};

export default Hollywood;
