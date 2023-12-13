import React from "react";
import BingoDobleMusical from "../BingoDobleMusical";
import { ImEvil2 } from "react-icons/im";
import { Link } from "react-router-dom";

const Tongo = () => {
  return     <div>
  <h2 className="absolute right-16 top-36 text-4xl font-semibold flex gap-4">
    Quina Tongo <ImEvil2 />
    <Link to="/stream" className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Ruleta</Link>
  </h2>
  <BingoDobleMusical isManualMode />
</div>;
}

export default Tongo;
