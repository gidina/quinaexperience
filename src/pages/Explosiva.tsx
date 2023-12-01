import React from "react";
import BingoDobleMusical from "../BingoDobleMusical";
import { FaBomb } from "react-icons/fa";

const Explosiva = () => {
  return (
    <div>
      <h2 className="absolute right-16 top-36 text-4xl font-semibold flex gap-4">
        Quina Explosiva <FaBomb />
      </h2>
      <BingoDobleMusical />
    </div>
  );
};

export default Explosiva;
