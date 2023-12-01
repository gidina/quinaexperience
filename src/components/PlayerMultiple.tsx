import React, { useState, useEffect } from "react";

const useAudioContext = () => {
  const [context, setContext] = useState<AudioContext>();
  const [hadInteraction, setHadInteraction] = useState(false);

  // const audioCtxContainer = useRef(null);
  // audioCtxContainer.current = new AudioContext();
  // audioCtxContainer.current
  // .decodeAudioData(ev.target.result)
  // .then(function (buffer) {
  //   playSound(buffer);
  // });

  // const context = new AudioContext();
  // const osc = context.createOscillator();
  // const amp = context.createGain();

  // osc.connect(amp);
  // amp.connect(context.destination);
  // osc.start();

  // useEffect(() => {
  // const audioContext = new AudioContext();
  // }, []);

  // setContext(new AudioContext());

  useEffect(() => {
    if (context) {
      return;
    }

    if (hadInteraction) {
      const newContext = new AudioContext();
      const audio = new Audio("/src/assets/musical/1.wav");
      newContext.createMediaElementSource(audio);

      // const osc = newContext.createOscillator();
      // const amp = newContext.createGain();

      // osc.connect(amp);
      // amp.connect(newContext.destination);
      // osc.start();
      // audio.connect(newContext.destination);
      // newContext.

      setContext(newContext);
      return;
    }
  }, [hadInteraction, context]);

  const play = async () => {
    if (!context) {
      return;
    }

    try {
      await context.resume();
    } catch (error) {
      console.log("No s'ha pogut reproduir la cançó");
    }
  };
  const stop = async () => {
    if (!context) {
      return;
    }

    try {
      await context.suspend();
    } catch (error) {
      console.log("No s'ha pogut aturar la reproducció en curs");
    }
  };

  const start = () => {
    if (!hadInteraction) {
      setHadInteraction(true);
      return;
    }
  };

  return { context, play, stop, start };
};

const useAudio = (files: string[]) => {
  // const [audiosURLs] = useState(files);
  const [indexPlaying, setIndexPlaying] = useState<number>(0);
  // const [playing, setPlaying] = useState(false);

  // const [audio, setAudio] = useState<HTMLAudioElement>();

  const current = indexPlaying;
  // const [playing, setPlaying] = useState(false);
  const playing = true;

  // const toggle = () => setPlaying(!playing);
  // const pause = () => setPlaying(false);
  // const play = () => setPlaying(true);
  const toggle = () => null;
  const pause = () => null;
  const play = () => null;
  const previous = () => {
    setIndexPlaying((previousIndexPlaying) =>
      Math.max(0, previousIndexPlaying - 1)
    );
  };
  const next = () => {
    setIndexPlaying((previousIndexPlaying) =>
      Math.min(previousIndexPlaying + 1, files.length)
    );
  };

  useEffect(() => {
    const url = files[indexPlaying];
    // newAudio.play();
    const newAudio = new Audio(url);
    // newAudio.muted = true;

    const playAudio = async () => {
      await newAudio.play();
    };

    try {
      playAudio();
    } catch (e) {
      console.log("Error playing");
    }

    // setAudio(newAudio);
    const ended = () => console.log("finished 1");
    newAudio.addEventListener("ended", ended);
    return () => {
      newAudio.removeEventListener("ended", ended);
    };
  }, [indexPlaying]);

  // useEffect(() => {
  //   const newAudio = new Audio(url);
  //   setAudio(newAudio);

  //   newAudio.addEventListener("ended", () => setPlaying(false));
  //   return () => {
  //     newAudio.removeEventListener("ended", () => setPlaying(false));
  //   };
  // }, [url]);

  // useEffect(() => {
  //   if (!audio) {
  //     return;
  //   }

  //   playing ? audio.play() : audio.pause();
  // }, [playing]);

  // useEffect(() => {
  //   audio?.addEventListener("ended", () => setPlaying(false));
  //   return () => {
  //     audio?.removeEventListener("ended", () => setPlaying(false));
  //   };
  // }, []);

  return { playing, toggle, pause, play, current, next, previous };
};

const Player = ({ files }) => {
  // const { playing, toggle, pause, play, next, previous, current } =
  //   useAudio(files);
  const { context, play, stop, start } = useAudioContext();

  const toggleAudio = () => {
    console.log("toggleAudio", context.state);
    // if (context.state === "suspended") {
    //   context.resume();
    // } else {
    //   context.suspend();
    // }
  };

  return (
    <div>
      Player 2
      {/* <button onClick={toggleAudio}>toogle audio {context.state}</button> */}
      <button onClick={stop}>STOP</button>
      <button onClick={play}>PLAY</button>
      <button onClick={start}>START</button>
      {/* <span>{`Playing ${current}...`}</span> */}
      <br></br>
    </div>
  );

  // return (
  //   <div>
  //     <span>{`Playing ${current}...`}</span>
  //     <br></br>
  //     <button
  //       onClick={() => {
  //         previous();
  //       }}
  //     >
  //       Previous
  //     </button>
  //     <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
  //     <button
  //       onClick={() => {
  //         next();
  //       }}
  //     >
  //       Next
  //     </button>
  //   </div>
  // );
};

export default Player;
