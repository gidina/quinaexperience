import React from "react";

type DrawedNumbers = number[];

interface Last5Drawed {
  drawedNumbers: DrawedNumbers;
}

const Last5Drawed = ({ drawedNumbers }: Last5Drawed) => {
  const last5 = drawedNumbers.slice(
    Math.max(0, drawedNumbers.length - 6),
    drawedNumbers.length - 1
  );

  return (
    <div className="flex flex-col gap-2 items-center">
      {/* <div className="text-5xl font-light">Últims 5</div> */}
      <div className="text-md font-light uppercase">Últims 5</div>
      <div className="w-9/12 grid grid-flow-col auto-cols-fr justify-center gap-4 text-5xl">
        {[...Array(Math.max(0, 5 - last5.length)).keys()].map((_num, index) => (
          <div key={index} className="bg-slate-500 p-4 rounded-xl flex justify-center items-center aspect-square font-medium" />
        ))}
        {last5.map((num: number, index) => (
          <div key={index} className="bg-[color:var(--color-tongo)] p-4 rounded-xl flex justify-center items-center aspect-square font-medium">
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Last5Drawed;
