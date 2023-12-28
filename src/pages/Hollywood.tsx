import React from "react";
import { MdMovieCreation } from "react-icons/md";
import songs from "../assets/hollywood";
import Bingo from "../components/Bingo";
import QuinaDetailTitle from "../components/QuinaDetailTitle";

const Hollywood = () => {
  return (
    <>
      <QuinaDetailTitle>
        Quina Hollywood <MdMovieCreation />
      </QuinaDetailTitle>
      <Bingo songs={songs} maxNumber={70} awards={["Quina"]} />
    </>
  );
};

export default Hollywood;
