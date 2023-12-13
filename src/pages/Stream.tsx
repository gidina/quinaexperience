import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Stream = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        videoRef.current.srcObject = stream;
      })
      .catch(function (error) {
        console.log("Something went wrong!");
      });
  });

  const drawCanvas = (img) => {
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

  return (
    <main className="p-16">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <button onClick={onTakePhotoButtonClick} className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Captura</button>
          <button onClick={stop} className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Atura</button>
          <Link to="/" className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Ves a la Pàgina principal</Link>
        </div>
        <div className="flex gap-4">
          <video autoPlay ref={videoRef} className="h-screen"></video>
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </main>
  );
};

export default Stream;
