import React from "react";
import { PiMicrophoneStageFill } from "react-icons/pi";
import Bingo from "../components/Bingo";
import QuinaDetailTitle from "../components/QuinaDetailTitle";

const Cantada = () => {
  return (
    <>
      <QuinaDetailTitle>
        Quina Cantada <PiMicrophoneStageFill />
      </QuinaDetailTitle>
      <Bingo awards={["Línia", "Quina", "Quina"]} />
    </>
  );
};

export default Cantada;
