import files from "./assets/musical";
import { generateRandom } from "./utils";

const songVideosAndImages = [
  {
    video:
      "https://www.youtube.com/embed/vXtJkDHEAAc?autoplay=1&mute=1&si=MLyFwfcHCT5oP78G&amp;controls=0&amp;start=53",
    image:
      "https://i1.sndcdn.com/artworks-gjNP20lZ4WyYHp9t-ovUH3w-t500x500.jpg",
  },
  {
    video:
      "https://www.youtube.com/embed/2Fy8P1MVfsQ?autoplay=1&mute=1&si=ld2oyb8kjgGT1yge&amp;controls=0&amp;start=90",
    image:
      "https://e00-elmundo.uecdn.es/elmundo/videos/2011/09/19/barcelona/1316446525_extras_video_2.jpg",
  },
];

const songs = [...Array(90).keys()].map((n) => {
  const rand = generateRandom(0, 1);
  const songVideoAndImage = songVideosAndImages[rand];

  const songIndex = Number(n);
  const songNumber = Number(songIndex + 1);
  return {
    title: `Song Number ${songNumber}`,
    singer: `Singer Name song ${songNumber}`,
    src: files[songIndex],
    // ...songVideoAndImage,
  };
});

export default songs;
