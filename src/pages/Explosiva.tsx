import React from "react";
import { Link } from "react-router-dom";
import { FaBomb } from "react-icons/fa";
import Bingo from "../components/Bingo";
import QuinaDetailTitle from "../components/QuinaDetailTitle";

const Explosiva = () => {
  return (
    <div className="w-full h-full flex m-auto">
      <QuinaDetailTitle>
        Quina Explosiva <FaBomb />
        <Link to="/stream" className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Concurs</Link>
      </QuinaDetailTitle>
      <Bingo awards={["Línia", "Quina", "Quina"]} />
    </div>
  );
};

export default Explosiva;
