import React from "react";
import BingoDobleMusical from "../BingoDobleMusical";
import songs from "../musical";
import { PiMusicNotesFill } from "react-icons/pi";

const Musical = () => {
  return (
    <div>
      <h2 className="absolute right-16 top-36 text-4xl font-semibold flex gap-4">
        Quina Musical <PiMusicNotesFill />
      </h2>
      <BingoDobleMusical songs={songs} />
    </div>
  );
};

export default Musical;
