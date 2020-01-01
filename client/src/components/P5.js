import React from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./sketch";

export default function P5(props) {
  return (
    <P5Wrapper
      sketch={sketch}
      appFianlResult={props.appFianlResult}
      pose={props.pose}
    />
  );
}
