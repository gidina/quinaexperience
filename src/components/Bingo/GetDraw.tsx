import React, { useState } from "react";

type DrawedNumbers = number[];
type MaxNumber = number;

interface GetDraw {
  drawedNumbers: DrawedNumbers;
  getDraw: (newDraw?: number) => void;
  maxNumber: MaxNumber;
  isManualMode: boolean;
  autoPlay: boolean;
  disabled?: boolean;
}

interface GetDrawButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const GetDrawButton = ({ onClick, disabled }: GetDrawButton) => (
  <button
    className="bg-red-700 text-white font-medium rounded-lg	text-xl font-light p-3 border-red-700 border-solid hover:bg-red-800 hover-border-red-800 hover:cursor-pointer focus:outline-none	disabled:bg-red-400 disabled:cursor-not-allowed disabled:hover:border-transparent"
    onClick={onClick}
    disabled={disabled}
  >
    Generar
  </button>
);

const GetDraw = ({
  drawedNumbers,
  maxNumber,
  isManualMode,
  getDraw,
  autoPlay,
  disabled=false
}: GetDraw) => {
  const [inputNumber, setInputNumber] = useState("");

  if (!!autoPlay) {
    return null;
  }

  if (!isManualMode) {
    if (disabled) {
      return null;
    }

    return (
      <GetDrawButton
        onClick={() => getDraw()}
        disabled={drawedNumbers.length === maxNumber || disabled}
      />
    );
  }

  return (
    <form className="flex gap-4" onSubmit={(e) => e.preventDefault()}>
      <input
        autoFocus
        type="number"
        name="input-draw"
        id="input-draw"
        autoComplete="input-draw"
        value={inputNumber}
        disabled={drawedNumbers.length === maxNumber}
        onChange={(e) => setInputNumber(e.target.value)}
        min={1}
        max={maxNumber}
        className="block w-full rounded-md border-0 py-3 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 text-4xl focus:outline-none"
      />
      <GetDrawButton
        onClick={() => {
          const inputNumberAsNumber = Number(inputNumber);
          if (inputNumberAsNumber < 1 || inputNumberAsNumber > maxNumber) {
            setInputNumber("");
            alert(
              `El número introduït ha de ser més gran que '1' i més petit que '${maxNumber}'`
            );
            return;
          }

          if (drawedNumbers.includes(inputNumberAsNumber)) {
            setInputNumber("");
            alert("Aquest número ja ha sortit!");
            return;
          }

          getDraw(inputNumberAsNumber);
          setInputNumber("");
        }}
        disabled={drawedNumbers.length === maxNumber || disabled}
      />
    </form>
  );
};

export default GetDraw;
