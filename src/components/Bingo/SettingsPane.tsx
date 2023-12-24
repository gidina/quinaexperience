import React from "react";
import { MdSkipPrevious } from "react-icons/md";
import { FaSave } from "react-icons/fa";

type DrawedNumbers = number[];

interface SettingsPane {
  drawedNumbers: DrawedNumbers;
  undo: () => void;
}

const settingsPaneIconClassName = "w-8 h-8 transition-transform hover:scale-125 hover:cursor-pointer";
const SettingsPane = ({ undo, drawedNumbers }: SettingsPane) => (
  // <div className="absolute top-4 left-4 flex justify-end items-center gap-6">
  <div className="absolute top-4 right-4 flex justify-end items-center gap-6">
    <MdSkipPrevious
      onClick={undo}
      className={settingsPaneIconClassName}
    />
    <FaSave
      onClick={() => {
        const csv = JSON.stringify(drawedNumbers.join("\n"));
        localStorage.setItem(`uuhquinaexperience-${Date.now()}`, csv);
      }}
      className={settingsPaneIconClassName}
    />
  </div>
);

export default SettingsPane;
