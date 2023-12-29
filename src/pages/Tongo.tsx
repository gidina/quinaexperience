import React from "react";
import { Link } from "react-router-dom";
import { ImEvil2 } from "react-icons/im";
import Bingo from "../components/Bingo";
import QuinaDetailTitle from "../components/QuinaDetailTitle";

const Tongo = () => {
  return (
    <>
      <QuinaDetailTitle>
        Quina Tongo <ImEvil2 />
        <Link
          to="/stream/tongo"
          className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Ruleta
        </Link>
      </QuinaDetailTitle>
      <Bingo isManualMode awards={["Línia", "Quina"]} />
    </>
  );
};

export default Tongo;
