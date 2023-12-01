import React from "react";
import BingoDobleMusical from "../BingoDobleMusical";
import { PiMicrophoneStageFill } from "react-icons/pi";

const Cantada = () => {
  return     <div>
  <h2 className="absolute right-16 top-36 text-4xl font-semibold flex gap-4">
    Quina Cantada <PiMicrophoneStageFill />
  </h2>
  <BingoDobleMusical />
</div>;
}

export default Cantada;
