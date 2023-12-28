import React, { useState } from "react";
import NewAudioPlayer from "../NewAudioPlayer";
import SettingsPane from "./SettingsPane";
import LastDraw from "./LastDraw";
import Last5Drawed from "./Last5Drawed";
import GetDraw from "./GetDraw";

type DrawedNumbers = number[];
type MaxNumber = number;

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
  awards: string[];
}

type Song = {
  title: string;
  singer?: string;
  src: string;
  video?: string;
  image?: string;
};

interface Badge {
  active?: boolean;
  children: string;
  onClick: () => void;
}

const Badge: React.FC<Badge> = ({ active = false, onClick, children }) => (
  <button
    className={`py-4 rounded-lg text-4xl border-2 ${
      active
        ? "border-green-600 bg-green-300"
        : "border-dashed border-gray-600 bg-gray-300"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

interface Badges {
  awards: string[];
}

const Badges = ({ awards }: Badges) => {
  const [selectedBadges, setSelectedBadges] = useState<number[]>([]);
  return (
    <div className="w-full grid grid-cols-3 gap-4">
      {awards.map((award, index) => (
        <Badge
          key={index}
          active={selectedBadges.includes(index)}
          onClick={() =>
            setSelectedBadges((prevSelectedBadges) => {
              if (prevSelectedBadges.includes(index)) {
                return prevSelectedBadges.filter((el) => el !== index);
              }

              return [...prevSelectedBadges, index];
            })
          }
        >
          {award}
        </Badge>
      ))}
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
  awards,
}: BingoInfo) => {
  return (
    <div className="grid grid-rows-[auto_minmax(0,1fr)] gap-4 w-full h-full">
      {/* // <div className="w-full flex flex-col gap-8 max-w[1000px]"> */}
      <div className="w-full flex flex-col gap-4">
        <SettingsPane undo={undo} drawedNumbers={drawedNumbers} />
        <div className="w-full flex flex-col gap-4">
          <LastDraw drawedNumbers={drawedNumbers} />
          {!song?.songCount && <Last5Drawed drawedNumbers={drawedNumbers} />}
        </div>
        {!song?.songCount && <Badges awards={awards} />}
        {!song?.songCount && <GetDraw
          drawedNumbers={drawedNumbers}
          maxNumber={maxNumber}
          getDraw={getDraw}
          isManualMode={isManualMode}
          autoPlay={autoPlay}
          disabled={!!song?.songCount && !!song?.currentSong}
        />}
      </div>
      {/* {!!song?.songCount && (
        <AudioPlayer
          key={song?.songIndex}
          currentSong={song?.currentSong}
          songCount={song?.songCount}
          songIndex={song?.songIndex}
          onNext={drawedNumbers.length === maxNumber ? undefined : song?.onNext}
        />
      )} */}
      {!!song?.songCount && (
        <NewAudioPlayer
          key={song?.songIndex}
          currentSong={song?.currentSong}
          songCount={song?.songCount}
          songIndex={song?.songIndex}
          onNext={drawedNumbers.length === maxNumber ? undefined : song?.onNext}
        />
      )}
    </div>
  );
};

export default BingoInfo;
