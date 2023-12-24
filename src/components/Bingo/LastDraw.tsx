import React from "react";
import namesNumbers from "../../numeros";

type DrawedNumbers = number[];

interface LastDraw {
  drawedNumbers: DrawedNumbers;
}

const LastDraw = ({ drawedNumbers }: LastDraw) => {
  const lastNumber = drawedNumbers[drawedNumbers.length - 1];

  // TODO: dont use absolute position for last label (Últim)
  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center bg-[#FFBB5C] p-16 rounded-xl h-44 text-center">
      <div className="text-md font-light uppercase">Últim</div>
      <div className="text-6xl font-bold">{lastNumber || "-"}</div>
      <div className="text-3xl">{namesNumbers[lastNumber - 1]}</div>
    </div>
  );

  // return (
  //   <div className="flex flex-col gap-8 items-center">
  //     <div className="text-6xl font-light">Últim</div>
  //     <div className="w-full flex flex-col gap-8 justify-center items-center bg-[#FFBB5C] p-16 rounded-xl h-96">
  //       <div className="text-9xl">{lastNumber || "-"}</div>
  //       <div className="text-6xl">{namesNumbers[lastNumber - 1]}</div>
  //     </div>
  //   </div>
  // );
};

export default LastDraw;
