import React from "react";
import Webcam from "react-webcam";

export default function WebCamera() {
  const videoConstraints = {
    width: 1280,
    height: 720,
    // facingMode: "user"
    facingMode: "environment"
  };

  const webcamRef = React.useRef(null);

  // const capture = React.useCallback(() => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  // }, [webcamRef]);

  return (
    <Webcam
      audio={false}
      height={360}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      width={640}
      mirrored={true}
      videoConstraints={videoConstraints}
      id="video"
    />
  );
}
