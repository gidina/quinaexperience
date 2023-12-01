import React, { useState, useEffect } from "react";

const useAudio = (url) => {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);
  const pause = () => setPlaying(false);
  const play = () => setPlaying(true);

  useEffect(() => {
    const newAudio = new Audio(url);
    setAudio(newAudio);

    newAudio.addEventListener("ended", () => setPlaying(false));
    return () => {
      newAudio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [url]);

  useEffect(() => {
    if (!audio) {
      return;
    }

    playing ? audio.play() : audio.pause();
  }, [playing]);

  // useEffect(() => {    
  //   audio?.addEventListener("ended", () => setPlaying(false));
  //   return () => {
  //     audio?.removeEventListener("ended", () => setPlaying(false));
  //   };
  // }, []);

  return { playing, toggle, pause, play };
};

const Player = ({ url, next, previous }) => {
  const { playing, toggle, pause, play } = useAudio(url);

  return (
    <div>
      <span>{`Playing ${url}...`}</span><br></br>
      <button onClick={() => { pause(); previous(); }}>Previous</button>
      <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
      <button onClick={() => { pause(); next(); }}>Next</button>
    </div>
  );
};

export default Player;
