import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import fileTongo from "../assets/spinning_wheel.mp3";
import fileExplosiva from "../assets/Benny Hill.mp3";
import fileExplosivaBomb from "../assets/grand_prix_intro_23.mp3";
import { FaBomb } from "react-icons/fa";

interface Stream {
  quina?: "tongo" | "explosiva";
}

const Stream = ({ quina }: Stream) => {
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] =
    useState<MediaDeviceInfo["deviceId"]>();
  const [hasExploded, setHasExploded] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );

        setCameras(videoDevices);

        var constraints = {
          deviceId: selectedCamera || videoDevices[0]?.deviceId,
          // advanced: { deviceId: selectedCamera }
          // width: { min: 1024, ideal: 1280, max: 1920 },
          // height: { min: 776, ideal: 720, max: 1080 },
          // deviceId: { exact: selectedCamera },
        };
        return navigator.mediaDevices.getUserMedia({ video: constraints });
      })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error(`${err.name}: ${err.message}`);
      });
  }, [selectedCamera]);

  // useEffect(() => {
  //   if (!canvasRef.current) {
  //     return;
  //   }

  //   const canvasWidth = canvasRef.current.width;
  //   const canvasHeight = canvasRef.current.height;

  //   const context = canvasRef.current.getContext("2d");

  //   window.addEventListener("resize", resizeCanvas, false);
  //   const resizeCanvas = () => {
  //     canvasRef.current.width = window.innerWidth;
  //     canvasRef.current.height = window.innerHeight;
  //     drawCanvas();
  //   }
  //   resizeCanvas();
  // }, []);

  const drawCanvas = (img) => {
    console.log("drawCanvas");
    if (!canvasRef.current) {
      return;
    }

    const canvasWidth = canvasRef.current.width;
    const canvasHeight = canvasRef.current.height;

    const context = canvasRef.current.getContext("2d");

    canvasRef.current.width = getComputedStyle(canvasRef.current).width.split(
      "px"
    )[0];
    canvasRef.current.height = getComputedStyle(canvasRef.current).height.split(
      "px"
    )[0];

    let ratio = Math.min(canvasWidth / img.width, canvasHeight / img.height);
    let x = (canvasWidth - img.width * ratio) / 2;
    let y = (canvasHeight - img.height * ratio) / 2;
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      x,
      y,
      img.width * ratio,
      img.height * ratio
    );
  };

  const onTakePhotoButtonClick = () => {
    if (!videoRef.current) {
      return;
    }

    const stream = videoRef.current.srcObject;

    if (!stream) {
      return;
    }

    const mediaStream = stream as MediaStream;

    const track = mediaStream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(track);

    // imageCapture.takePhoto({imageWidth: input.value})
    imageCapture
      .takePhoto()
      .then((blob) => createImageBitmap(blob))
      .then((imageBitmap) => {
        drawCanvas(imageBitmap);
        console.log(`Photo size is ${imageBitmap.width}x${imageBitmap.height}`);
      })
      .catch((error) => console.log(error));
  };

  const stop = (e) => {
    if (!videoRef.current) {
      return;
    }

    const stream = videoRef.current.srcObject;

    if (!stream) {
      return;
    }

    const mediaStream = stream as MediaStream;
    const tracks = mediaStream.getVideoTracks();

    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      track.stop();
    }

    videoRef.current.srcObject = null;
  };
  // height: calc(100vh - 80px);
  // h-[calc(100vh-2rem)]

  if (quina === "tongo") {
    return (
      <main className="p-12">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <select
              onChange={(e) => setSelectedCamera(e.target.value)}
              value={selectedCamera}
            >
              {cameras.map((camera) => (
                <option key={camera.deviceId} value={camera.deviceId}>
                  {camera.label}
                </option>
              ))}
            </select>
            <audio preload="metadata" controls loop>
              <source type="audio/mpeg" src={fileTongo} />
            </audio>
            <button
              onClick={onTakePhotoButtonClick}
              className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Captura
            </button>
            <button
              onClick={stop}
              className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Atura
            </button>
            <Link
              to="/"
              className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Ves a la Pàgina principal
            </Link>
          </div>
          <div className="flex gap-4">
            <video
              autoPlay
              ref={videoRef}
              className="h-[calc(100vh-200px)]"
            ></video>
            <canvas ref={canvasRef} className="w-full h-full"></canvas>
          </div>
        </div>
      </main>
    );
  }

  if (quina === "explosiva") {
    return (
      <main className="p-12">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <select
              onChange={(e) => setSelectedCamera(e.target.value)}
              value={selectedCamera}
            >
              {cameras.map((camera) => (
                <option key={camera.deviceId} value={camera.deviceId}>
                  {camera.label}
                </option>
              ))}
            </select>
            {!hasExploded && (
              <audio preload="metadata" controls loop>
                <source type="audio/mpeg" src={fileExplosiva} />
              </audio>
            )}
            {hasExploded && (
              <audio preload="metadata" controls autoPlay>
                <source type="audio/mpeg" src={fileExplosivaBomb} />
              </audio>
            )}
            <FaBomb
              onClick={() => setHasExploded(true)}
              className="transition-transform hover:scale-125 hover:cursor-pointer"
            />
            <button
              onClick={onTakePhotoButtonClick}
              className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Captura
            </button>
            <button
              onClick={stop}
              className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Atura
            </button>
            <Link
              to="/"
              className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Ves a la Pàgina principal
            </Link>
          </div>
          <div className="flex gap-4">
            <video
              autoPlay
              ref={videoRef}
              className="h-[calc(100vh-200px)]"
            ></video>
            <canvas ref={canvasRef} className="w-full h-full"></canvas>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="p-12">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <select
            onChange={(e) => setSelectedCamera(e.target.value)}
            value={selectedCamera}
          >
            {cameras.map((camera) => (
              <option key={camera.deviceId} value={camera.deviceId}>
                {camera.label}
              </option>
            ))}
          </select>
          <button
            onClick={onTakePhotoButtonClick}
            className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Captura
          </button>
          <button
            onClick={stop}
            className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Atura
          </button>
          <Link
            to="/"
            className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Ves a la Pàgina principal
          </Link>
        </div>
        <div className="flex gap-4">
          <video
            autoPlay
            ref={videoRef}
            className="h-[calc(100vh-200px)]"
          ></video>
          <canvas ref={canvasRef} className="w-full h-full"></canvas>
        </div>
      </div>
    </main>
  );
};

export default Stream;
