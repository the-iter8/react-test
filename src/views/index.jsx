import video from "../assets/test.mp4";
import { useEffect, useState, useRef } from "react";
import { PIPPortal } from "react-pip";

export const PiPExample = () => {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    console.log(videoLoaded, "loaded");
  }, [videoLoaded]);

  const togglePiP = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        if (videoLoaded) {
          console.log(videoRef.current, "this si the referance");
          await videoRef.current.requestPictureInPicture();
        } else {
          console.error("Video metadata not loaded yet.");
        }
      }
    } catch (error) {
      console.error("Error with PiP:", error);
    }
  };

  return (
    <div>
      <p>this is the </p>
      <video ref={videoRef} width='750' height='500' controls onLoadedMetadata={() => setVideoLoaded(true)}>
        <source src={video} type='video/mp4'></source>
      </video>
      <button onClick={togglePiP}>Toggle PiP</button>
    </div>
  );
};

export const PipExamplePackage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle PIP Window</button>
      {isOpen && (
        <PIPPortal width={400} height={200} onClose={() => setIsOpen(false)}>
          THis is the content. Click me to update.
          <button onClick={() => setCount((prev) => prev + 1)}>Click me to increase</button>
        </PIPPortal>
      )}
    </>
  );
};
