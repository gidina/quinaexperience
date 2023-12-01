import React from "react";
import BingoDobleMusical from "../BingoDobleMusical";
import { ImEvil2 } from "react-icons/im";

const Tongo = () => {
  return     <div>
  <h2 className="absolute right-16 top-36 text-4xl font-semibold flex gap-4">
    Quina Tongo <ImEvil2 />
  </h2>
  <BingoDobleMusical isManualMode />
</div>;
}

export default Tongo;
