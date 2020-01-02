import React, { useState, useEffect } from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./sketch";
import "./responsive-player.css";

function getWindowDimensions() {
  const { clientWidth: width, clientHeight: height } = window.document.body;
  return {
    width,
    height
  };
}

export default function P5(props) {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <P5Wrapper
        sketch={sketch}
        appFianlResult={props.appFianlResult}
        pose={props.pose}
        windowDimensions={windowDimensions}
      />
    </div>
  );
}
