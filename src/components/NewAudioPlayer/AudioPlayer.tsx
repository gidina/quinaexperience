import * as React from "react";
import {
  MdPlayArrow,
  MdPause,
  MdSkipNext,
  MdSkipPrevious,
  MdVolumeUp,
  MdVolumeOff,
} from "react-icons/md";
import { CgSpinner } from "react-icons/cg";
import IconButton from "./IconButton";
import AudioProgressBar from "./AudioProgressBar";
import VolumeInput from "./VolumeInput";
import christmasBackground from "../../assets/christmas-rock-bg.jpg";

type Song = {
  title: string;
  singer?: string;
  src: string;
  video?: string;
  image?: string;
};

const AudioCoverOrVideo = ({ song }: { song?: Song }) => {
  if (song?.video) {
    return (
      <iframe
        // width="1069"
        // height="384"
        src={song?.video}
        // src="https://www.youtube.com/embed/vXtJkDHEAAc?autoplay=1&mute=1&si=MLyFwfcHCT5oP78G&amp;controls=0&amp;start=53"
        title="YouTube video player"
        // frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        // className="object-contain w-full m-auto overflow-hidden"
        className="max-h-full w-full h-full"
        allowFullScreen
      ></iframe>
    );
  }

  if (song?.image) {
    return (
      // <div className="bg-black">
        <img
          // className="object-contain h-96 w-[1069px]"
          // className="object-contain w-full m-auto overflow-hidden"
          className="max-h-full w-full object-cover"
          src={song?.image}
          alt={song?.title}
        />
      // </div>
    );
  }

  return (
    <img
      src={christmasBackground}
      // className="object-cover w-full m-auto overflow-hidden"
      className="max-h-full w-full object-cover"
    />
  );
};

interface AudioControlsProps {
  currentSong?: Song;
  songIndex: number;
  songCount: number;
  onNext?: () => void;
  onPrev?: () => void;
}

const AudioControls = ({
  currentSong,
  songIndex,
  songCount,
  onPrev,
  onNext,
}: AudioControlsProps) => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const [isReady, setIsReady] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [currentProgress, setCurrentProgress] = React.useState(0);
  const [buffered, setBuffered] = React.useState(0);
  const [volume, setVolume] = React.useState(0.2);
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    audioRef.current?.pause();

    const timeout = setTimeout(() => {
      audioRef.current?.play();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [songIndex]);

  const handleNext = () => {
    onNext?.();
  };

  const handlePrev = () => {
    onPrev?.();
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleBufferProgress: React.ReactEventHandler<HTMLAudioElement> = (
    e
  ) => {
    const audio = e.currentTarget;
    const dur = audio.duration;
    if (dur > 0) {
      for (let i = 0; i < audio.buffered.length; i++) {
        if (
          audio.buffered.start(audio.buffered.length - 1 - i) <
          audio.currentTime
        ) {
          const bufferedLength = audio.buffered.end(
            audio.buffered.length - 1 - i
          );
          setBuffered(bufferedLength);
          break;
        }
      }
    }
  };

  const handleMuteUnmute = () => {
    if (!audioRef.current) return;

    if (audioRef.current.volume !== 0) {
      audioRef.current.volume = 0;
    } else {
      audioRef.current.volume = 1;
    }
  };

  const handleVolumeChange = (volumeValue: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = volumeValue;
    setVolume(volumeValue);
  };

  return (
    <div>
      {currentSong && (
        <audio
          ref={audioRef}
          preload="metadata"
          onDurationChange={(e) => setDuration(e.currentTarget.duration)}
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={handleNext}
          onCanPlay={(e) => {
            e.currentTarget.volume = volume;
            setIsReady(true);
          }}
          onTimeUpdate={(e) => {
            setCurrentProgress(e.currentTarget.currentTime);
            handleBufferProgress(e);
          }}
          onProgress={handleBufferProgress}
          onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
        >
          <source type="audio/mpeg" src={currentSong.src} />
        </audio>
      )}
      <div className="grid grid-rows-3 items-center">
        <div className="flex gap-3 items-center justify-self-end">
          <IconButton
            intent="secondary"
            size="sm"
            onClick={handleMuteUnmute}
            aria-label={volume === 0 ? "unmute" : "mute"}
          >
            {volume === 0 ? <MdVolumeOff size={20} /> : <MdVolumeUp size={20} />}
          </IconButton>
          <VolumeInput volume={volume} onVolumeChange={handleVolumeChange} />
        </div>
        <div className="flex items-center gap-4 justify-self-center">
          <IconButton
            onClick={handlePrev}
            // disabled={songIndex === 0 || !onPrev}
            disabled={!onPrev}
            aria-label="go to previous"
            intent="secondary"
          >
            <MdSkipPrevious size={24} />
          </IconButton>
          <IconButton
            disabled={!isReady}
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
            size="lg"
          >
            {!isReady && currentSong ? (
              <CgSpinner size={24} className="animate-spin" />
            ) : isPlaying ? (
              <MdPause size={30} />
            ) : (
              <MdPlayArrow size={30} />
            )}
          </IconButton>
          <IconButton
            onClick={handleNext}
            // disabled={songIndex === songCount - 1 || !onNext}
            disabled={!onNext}
            aria-label="go to next"
            intent="secondary"
          >
            <MdSkipNext size={24} />
          </IconButton>
        </div>
        <AudioProgressBar
          duration={duration}
          currentProgress={currentProgress}
          buffered={buffered}
          onChange={(e) => {
            if (!audioRef.current) return;

            audioRef.current.currentTime = e.currentTarget.valueAsNumber;
            setCurrentProgress(e.currentTarget.valueAsNumber);
          }}
        />
      </div>
    </div>
  );
};

interface AudioPlayerProps {
  currentSong?: Song;
  songIndex: number;
  songCount: number;
  onNext?: () => void;
  onPrev?: () => void;
}

const AudioPlayer = ({
  currentSong,
  songCount,
  songIndex,
  onNext,
  onPrev,
}: AudioPlayerProps) => {
  return (
    <div className="grid grid-rows-[minmax(0,_1fr)_auto_auto] gap-4">
      <AudioCoverOrVideo song={currentSong} />
      <div className="flex flex-col gap-2.5">
        <p className="text-slate-300 font-bold text-4xl">
          {currentSong?.title ? currentSong?.title : "Títol: -"}
        </p>
        <p className="text-2xl">{currentSong?.singer ? currentSong?.singer : "Cantant: -"}</p>
      </div>
      <AudioControls
        onPrev={onPrev}
        currentSong={currentSong}
        onNext={onNext}
        songIndex={songIndex}
        songCount={songCount}
      />
    </div>
  );
}

export default AudioPlayer;
