import React, { useEffect, useState } from "react";
import { AUTO_PLAY_INTERVAL_MS, MAX_NUM, generateRandom } from "../../utils";
import BingoGrid from "./BingoGrid";
import BingoInfo from "./BingoInfo";

type DrawedNumbers = number[];
type MaxNumber = number;

type Song = { title: string; singer?: string; src: string; video?: string; image?: string };

interface Bingo {
  maxNumber?: MaxNumber;
  isManualMode?: boolean;
  autoPlay?: boolean;
  songs?: Song[];
  awards: string[];
}

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
  awards
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

  const save = () => {
    console.log("SAVED!", drawedNumbers);
    const csv = JSON.stringify(drawedNumbers.join("\n"));
    localStorage.setItem(`uuhquinaexperience-${Date.now()}`, csv);
  }

  useEffect(() => {
    save();
  }, [drawedNumbers, save]);

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
    <div className="w-full grid grid-cols-[auto_minmax(0,1fr)] gap-10">
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
        awards={awards}
      />
    </div>
  );
};

export default Bingo;
