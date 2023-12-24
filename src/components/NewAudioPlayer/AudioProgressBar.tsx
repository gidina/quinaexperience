import React from "react";

interface ProgressCSSProps extends React.CSSProperties {
  "--progress-width": number;
  "--buffered-width": number;
}

interface AudioProgressBarProps
  extends React.ComponentPropsWithoutRef<"input"> {
  duration: number;
  currentProgress: number;
  buffered: number;
}

const formatDurationDisplay = (duration: number) => {
  const min = Math.floor(duration / 60);
  const sec = Math.floor(duration - min * 60);

  const formatted = [min, sec].map((n) => (n < 10 ? "0" + n : n)).join(":");

  return formatted;
}

const AudioProgressBar = (props: AudioProgressBarProps) => {
  const { duration, currentProgress, buffered, ...rest } = props;

  const progressBarWidth = isNaN(currentProgress / duration)
    ? 0
    : currentProgress / duration;
  const bufferedWidth = isNaN(buffered / duration) ? 0 : buffered / duration;

  const progressStyles: ProgressCSSProps = {
    "--progress-width": progressBarWidth,
    "--buffered-width": bufferedWidth,
  };

  const durationDisplay = formatDurationDisplay(duration);
  const elapsedDisplay = formatDurationDisplay(currentProgress);

  // return (
  //   <div className="group">
  //     <input
  //       type="range"
  //       name="progress"
  //       style={progressStyles}
  //       className="w-full"
  //       min={0}
  //       max={duration}
  //       value={currentProgress}
  //       {...rest}
  //     />
  //     <span className="text-lg">
  //       {elapsedDisplay} / {durationDisplay}
  //     </span>
  //   </div>
  // );

  return (
    <div className="relative h-1 group">
      <input
        type="range"
        name="progress"
        className="progress-bar absolute inset-0 w-full m-0 h-full bg-transparent appearance-none cursor-pointer group-hover:h-2 transition-all accent-red-600 hover:accent-red-600 before:absolute before:inset-0 before:h-full before:w-full before:bg-red-600 before:origin-left after:absolute after:h-full after:w-full after:bg-red-600/50"
        // className={`progress-bar absolute inset-0 w-full m-0 h-full bg-transparent appearance-none cursor-pointer dark:bg-gray-700 group-hover:h-2 transition-all accent-amber-600 hover:accent-amber-600 before:absolute before:inset-0 before:h-full before:w-full before:bg-amber-600 before:origin-left after:absolute after:h-full after:w-full after:bg-amber-600/50`}
        style={progressStyles}
        min={0}
        max={duration}
        value={currentProgress}
        {...rest}
      />
      <span className="text-lg absolute mt-2">
        {elapsedDisplay} / {durationDisplay}
      </span>
    </div>
  );

  return (
    <>
      <label htmlFor="basic-range-slider-usage" className="sr-only">
        Example range
      </label>
      <input
        type="range"
        className={`w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
          [&::-webkit-slider-thumb]:w-2.5
          [&::-webkit-slider-thumb]:h-2.5
          [&::-webkit-slider-thumb]:-mt-0.5
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:transition-all
          [&::-webkit-slider-thumb]:duration-150
          [&::-webkit-slider-thumb]:ease-in-out
          [&::-webkit-slider-thumb]:dark:bg-slate-700

          [&::-moz-range-thumb]:w-2.5
          [&::-moz-range-thumb]:h-2.5
          [&::-moz-range-thumb]:appearance-none
          [&::-moz-range-thumb]:bg-white
          [&::-moz-range-thumb]:border-4
          [&::-moz-range-thumb]:border-blue-600
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:transition-all
          [&::-moz-range-thumb]:duration-150
          [&::-moz-range-thumb]:ease-in-out

          [&::-webkit-slider-runnable-track]:w-full
          [&::-webkit-slider-runnable-track]:h-2
          [&::-webkit-slider-runnable-track]:bg-gray-100
          [&::-webkit-slider-runnable-track]:rounded-full
          [&::-webkit-slider-runnable-track]:dark:bg-gray-700

          [&::-moz-range-track]:w-full
          [&::-moz-range-track]:h-2
          [&::-moz-range-track]:bg-gray-100
          [&::-moz-range-track]:rounded-full`
        }
        id="basic-range-slider-usage"
      ></input>
    </>
  );

  // return (
  //   <input
  //     type="range"
  //     name="progress"
  //     style={progressStyles}
  //     min={0}
  //     max={duration}
  //     value={currentProgress}
  //     {...rest}
  //   />
  // );
}

// import React from "react";

// interface ProgressCSSProps extends React.CSSProperties {
//   '--progress-width': number;
//   '--buffered-width': number;
// }

// interface AudioProgressBarProps
//   extends React.ComponentPropsWithoutRef<'input'> {
//   duration: number;
//   currentProgress: number;
//   buffered: number;
// }

// export default function AudioProgressBar(props: AudioProgressBarProps) {
//   const { duration, currentProgress, buffered, ...rest } = props;

//   const progressBarWidth = isNaN(currentProgress / duration)
//     ? 0
//     : currentProgress / duration;
//   const bufferedWidth = isNaN(buffered / duration) ? 0 : buffered / duration;

//   const progressStyles: ProgressCSSProps = {
//     '--progress-width': progressBarWidth,
//     '--buffered-width': bufferedWidth,
//   };

//   return (
//     <div className="absolute h-1 -top-1 left-0 right-0 group">
//       <input
//         type="range"
//         name="progress"
//         className="progress-bar absolute inset-0 w-full m-0 h-full bg-transparent appearance-none cursor-pointer group-hover:h-2 transition-all accent-red-600 hover:accent-red-600 before:absolute before:inset-0 before:h-full before:w-full before:bg-red-600 before:origin-left after:absolute after:h-full after:w-full after:bg-red-600/50"
//         // className={`progress-bar absolute inset-0 w-full m-0 h-full bg-transparent appearance-none cursor-pointer dark:bg-gray-700 group-hover:h-2 transition-all accent-amber-600 hover:accent-amber-600 before:absolute before:inset-0 before:h-full before:w-full before:bg-amber-600 before:origin-left after:absolute after:h-full after:w-full after:bg-amber-600/50`}
//         style={progressStyles}
//         min={0}
//         max={duration}
//         value={currentProgress}
//         {...rest}
//       />
//     </div>
//   );
// }

export default AudioProgressBar;
