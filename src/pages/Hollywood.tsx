import React from "react";
import { MdMovieCreation } from "react-icons/md";
import songs from "../assets/hollywood";
import Bingo from "../components/Bingo";
import QuinaDetailTitle from "../components/QuinaDetailTitle";

const Hollywood = () => {
  return (
    <div className="w-full h-full flex m-auto">
      <QuinaDetailTitle>
        Quina Hollywood <MdMovieCreation />
      </QuinaDetailTitle>
      <Bingo songs={songs} maxNumber={70} awards={["Quina"]} />
    </div>
  );
};

export default Hollywood;
