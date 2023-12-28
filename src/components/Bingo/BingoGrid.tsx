import React from "react";

type DrawedNumbers = number[];
type MaxNumber = number;

interface BingoItem {
  text: number;
  drawed: boolean;
}

interface BingoGrid {
  drawedNumbers: DrawedNumbers;
  maxNumber: MaxNumber;
}

const BingoItem = ({ text, drawed }: BingoItem) => {
  return (
    <div
      // className={`bg-[antiquewhite] text-4xl py-10 px-4 rounded-xl ${
      //   drawed ? "bg-green-400" : ""
      // }`}
      className={`bg-[antiquewhite] text-xl md:text-3xl lg:text-5xl border border-black aspect-square rounded-lg flex justify-center items-center ${
        drawed ? "bg-[color:var(--color-tongo)]" : ""
      }`}
    >
      {text}
    </div>
  );

  return (
    <div
      // className={`bg-[antiquewhite] text-4xl py-10 px-4 rounded-xl ${
      //   drawed ? "bg-green-400" : ""
      // }`}
      className={`bg-[antiquewhite] text-5xl rounded-xl p-[50px] ${
        drawed ? "bg-[color:var(--color-tongo)]" : ""
      }`}
    >
      {text}
    </div>
  );
};

const BingoGrid = ({ drawedNumbers, maxNumber }: BingoGrid) => {
  const numberIndexes = [...Array(maxNumber).keys()];
  
  // return (
  //   <div className="grid grid-cols-10 auto-rows-fr before:content-[''] before:w-0 before:row-start-1 before:row-end-1 first:bg-green-300 first:row-start-1 first:row-end-1">
  //     {numberIndexes.map((number, index) => (
  //       <div key={index} className="bg-gray-300">{number+1}</div>
  //     ))}
  //   </div>
  // );

  return (
    // <div className="grid grid-cols-[repeat(10,25px)] grid-rows-[25px] gap-4 text-center items-center justify-center">
    <div className="h-full grid grid-cols-[repeat(10,8vh)] grid-rows-[repeat(9,8vh)] gap-2.5 text-center items-center justify-center overflow-hidden">
    {/* // <div className="grid grid-cols-10 grid-rows-10 gap-4 text-center items-center justify-center w-full"> */}
      {numberIndexes.map((number, index) => (
        <BingoItem
          key={index}
          text={number + 1}
          drawed={drawedNumbers.includes(number + 1)}
        />
      ))}
    </div>
  );
};

export default BingoGrid;
