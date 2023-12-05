import React, { useEffect, useState } from "react";
import { MdSkipPrevious, MdOutlineSkipPrevious } from "react-icons/md";
import { FaRegSave, FaSave } from "react-icons/fa";
import { AUTO_PLAY_INTERVAL_MS, MAX_NUM, generateRandom } from "./utils";
import AudioPlayer from "./components/AudioPlayer";
import namesNumbers from "./numeros";

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

interface GetDraw {
  drawedNumbers: DrawedNumbers;
  getDraw: (newDraw?: number) => void;
  maxNumber: MaxNumber;
  isManualMode: boolean;
  autoPlay: boolean;
}

interface SettingsPane {
  drawedNumbers: DrawedNumbers;
  undo: () => void;
}

interface LastDraw {
  drawedNumbers: DrawedNumbers;
}
type Last5Drawed = LastDraw;

interface BingoInfo {
  drawedNumbers: DrawedNumbers;
  getDraw: (newDraw?: number) => void;
  maxNumber: MaxNumber;
  isManualMode: boolean;
  undo: () => void;
  autoPlay: boolean;
  song?: {
    currentSong: Song;
    songCount: number;
    songIndex: number;
    onNext: () => void;
  };
}

type Song = { title: string; singer?: string; src: string; video?: string; image?: string };

interface Bingo {
  maxNumber?: MaxNumber;
  isManualMode?: boolean;
  autoPlay?: boolean;
  songs?: Song[];
}

const BingoItem = ({ text, drawed }: BingoItem) => {
  return (
    <div
      // className={`bg-[antiquewhite] text-4xl py-10 px-4 rounded-xl ${
      //   drawed ? "bg-green-400" : ""
      // }`}
      className={`bg-[antiquewhite] text-4xl rounded-xl p-[55px] ${
        drawed ? "bg-[color:var(--color-tongo)]" : ""
      }`}
    >
      {text}
    </div>
  );
};

const BingoGrid = ({ drawedNumbers, maxNumber }: BingoGrid) => {
  const numberIndexes = [...Array(maxNumber).keys()];
  return (
    <div className="grid grid-cols-[repeat(10,150px)] grid-rows-[150px] gap-4 text-center items-center justify-center">
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

interface GetDrawButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const GetDrawButton = ({ onClick, disabled }: GetDrawButton) => (
  <button
    className="bg-red-700 text-white font-medium rounded-lg	text-4xl font-light p-6 border-red-700 border-solid hover:bg-red-800 hover-border-red-800 hover:cursor-pointer focus:outline-none	disabled:bg-red-400 disabled:cursor-not-allowed disabled:hover:border-transparent"
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
}: GetDraw) => {
  const [inputNumber, setInputNumber] = useState("");

  if (!!autoPlay) {
    return null;
  }

  if (!isManualMode) {
    return (
      <GetDrawButton
        onClick={() => getDraw()}
        disabled={drawedNumbers.length === maxNumber}
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
        className="block w-full rounded-md border-0 py-6 px-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 text-4xl focus:outline-none"
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
        disabled={drawedNumbers.length === maxNumber}
      />
    </form>
  );
};

const settingsPaneIconClassName = "w-10 h-10 transition-transform hover:scale-125 hover:cursor-pointer";
const SettingsPane = ({ undo, drawedNumbers }: SettingsPane) => (
  <div className="flex justify-end items-center gap-6">
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

const LastDraw = ({ drawedNumbers }: LastDraw) => {
  const lastNumber = drawedNumbers[drawedNumbers.length - 1];
  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="text-6xl font-light">Últim</div>
      <div className="w-full flex flex-col gap-8 justify-center items-center bg-[#FFBB5C] p-16 rounded-xl h-96">
        <div className="text-9xl">{lastNumber || "-"}</div>
        <div className="text-6xl">{namesNumbers[lastNumber - 1]}</div>
      </div>
    </div>
  );
};

const Last5Drawed = ({ drawedNumbers }: LastDraw) => {
  const last5 = drawedNumbers.slice(
    Math.max(0, drawedNumbers.length - 6),
    drawedNumbers.length - 1
  );

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="text-5xl font-light">Últims 5</div>
      <div className="flex justify-center gap-4 text-5xl">
        {[...Array(Math.max(0, 5 - last5.length)).keys()].map((_num, index) => (
          <div key={index} className="bg-slate-500 p-4 rounded-xl flex justify-center items-center w-32 h-32 font-medium" />
        ))}
        {last5.map((num: number, index) => (
          <div key={index} className="bg-[color:var(--color-tongo)] p-4 rounded-xl flex justify-center items-center w-32 h-32 font-medium">
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};

const BingoInfo = ({
  drawedNumbers,
  getDraw,
  maxNumber,
  isManualMode,
  undo,
  autoPlay,
  song,
}: BingoInfo) => {
  return (
    <div className="w-full flex flex-col gap-16">
      <SettingsPane undo={undo} drawedNumbers={drawedNumbers} />
      <LastDraw drawedNumbers={drawedNumbers} />
      <Last5Drawed drawedNumbers={drawedNumbers} />
      <GetDraw
        drawedNumbers={drawedNumbers}
        maxNumber={maxNumber}
        getDraw={getDraw}
        isManualMode={isManualMode}
        autoPlay={autoPlay}
      />
      {!!song?.songCount && (
        <AudioPlayer
          key={song?.songIndex}
          currentSong={song?.currentSong}
          songCount={song?.songCount}
          songIndex={song?.songIndex}
          onNext={song?.onNext}
        />
      )}
    </div>
  );
};

const getDrawAutomatic = ({
  drawedNumbers,
  maxNumber,
}: {
  drawedNumbers: DrawedNumbers;
  maxNumber: MaxNumber;
}): number | undefined => {
  if (drawedNumbers.length === maxNumber) {
    alert("Ja han sortit tots els números!");
    return;
  }

  let draw = generateRandom(1, maxNumber);

  while (drawedNumbers.includes(draw)) {
    draw = generateRandom(1, maxNumber);
  }

  return draw;
};

const getDrawManual =
  (draw?: number) =>
  ({
    drawedNumbers,
    maxNumber,
  }: {
    drawedNumbers: DrawedNumbers;
    maxNumber: MaxNumber;
  }): number | undefined => {
    if (!draw) {
      alert("S'ha d'introduir un número!");
      return;
    }

    if (drawedNumbers.length === maxNumber) {
      alert("Ja han sortit tots els números!");
      return;
    }

    return draw;
  };

const Bingo = ({
  maxNumber = MAX_NUM,
  isManualMode = false,
  autoPlay = false,
  songs = [],
}: Bingo) => {
  let interval;
  const [drawedNumbers, setDrawedNumbers] = useState<DrawedNumbers>([]);

  useEffect(() => {
    setDrawedNumbers([]);
  }, [maxNumber]);

  useEffect(() => {
    if (!autoPlay) {
      return;
    }

    // autoPlayFunc(); first execution
    interval = setInterval(getDraw, AUTO_PLAY_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const getDraw = (newDraw?: number) => {
    const getDrawByMode = isManualMode
      ? getDrawManual(newDraw)
      : getDrawAutomatic;

    setDrawedNumbers((previousDrawedNumbers) => {
      const draw = getDrawByMode({
        drawedNumbers: previousDrawedNumbers,
        maxNumber,
      });

      if (!draw) {
        autoPlay && clearInterval(interval);
        return previousDrawedNumbers;
      }

      return [...previousDrawedNumbers, draw];
    });
  };

  const undo = () => {
    setDrawedNumbers((previousDrawedNumbers) => {
      const currentDrawedNumbers = [...previousDrawedNumbers];
      const deletedElement = currentDrawedNumbers.pop();
      console.log("previous: ", drawedNumbers, "deleted: ", deletedElement);
      return currentDrawedNumbers;
    });
  };

  const lastNumber = drawedNumbers[drawedNumbers.length - 1];
  const songIndex = lastNumber - 1;
  const currentSong = songs[songIndex];

  const onNext = () => getDraw();

  return (
    <div className="flex gap-16">
      <BingoGrid drawedNumbers={drawedNumbers} maxNumber={maxNumber} />
      <BingoInfo
        drawedNumbers={drawedNumbers}
        getDraw={getDraw}
        maxNumber={maxNumber}
        isManualMode={isManualMode}
        undo={undo}
        autoPlay={autoPlay}
        song={{
          currentSong: currentSong,
          songCount: songs.length,
          songIndex: songIndex,
          onNext: onNext,
        }}
      />
    </div>
  );
};

export default Bingo;
