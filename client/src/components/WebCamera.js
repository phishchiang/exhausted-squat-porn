import React from "react";
import Webcam from "react-webcam";

export default function WebCamera({ webcamRef }) {
  const videoConstraints = {
    width: 1280,
    height: 720,
    // facingMode: "user"
    facingMode: "environment"
  };

  // const webcamRef = React.useRef(null);

  // const capture = React.useCallback(() => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  // }, [webcamRef]);

  return (
    <Webcam
      audio={false}
      height={100 + "%"}
      width={100 + "%"}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      mirrored={true}
      videoConstraints={videoConstraints}
      id="video"
    />
  );
}
