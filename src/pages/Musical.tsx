import React from "react";
import { PiMusicNotesFill } from "react-icons/pi";
import songs from "../assets/musical";
import Bingo from "../components/Bingo";
import QuinaDetailTitle from "../components/QuinaDetailTitle";

const Musical = () => {
  return (
    <>
      <QuinaDetailTitle>
        Quina Musical <PiMusicNotesFill />
      </QuinaDetailTitle>
      <Bingo songs={songs} awards={["Quina"]} />
    </>
  );
};

export default Musical;
