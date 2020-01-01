import React, { useState, useEffect } from "react";

let data_json_URL = "https://triangular-timer.glitch.me/data.json";
let model_json_URL = "https://triangular-timer.glitch.me/model.json";
let model_meta_json_URL =
  "https://cdn.glitch.com/7679638e-d60e-450f-bd42-ac4a97b51fab%2Fmodel_meta.json?v=1576657832277";
let model_weights_bin_URL =
  "https://cdn.glitch.com/7679638e-d60e-450f-bd42-ac4a97b51fab%2Fmodel.weights.bin?v=1576657673783";

export default function LoadCustomModel({ brain }) {
  const [pose, setPose] = useState(null);
  const [stateData, setStateData] = useState("waiting");
  const [inputs, setInputs] = useState([]);
  const [label, setLabel] = useState([]);
  const [myModel, setMyModel] = useState({});
  const [myModelisReady, setMyModelisReady] = useState(false);
  const [isFianlReady, setIsFianlReady] = useState(false);
  const [fianlResult, setFianlResult] = useState(null);

  const onLoadModel = () => {
    setMyModel({
      model: model_json_URL,
      metadata: model_meta_json_URL,
      weights: model_weights_bin_URL
    });
    setMyModelisReady(true);
  };

  const myModelReady = () => {
    console.log("My own model ready!!!");
    classifyPose();
  };

  const classifyPose = () => {
    if (pose) {
      let newInputArray = pose.keypoints
        .map(item => {
          return [item.position.x, item.position.y];
        })
        .flat();
      setInputs(newInputArray);
      setIsFianlReady(true);
      // console.log(inputs);
      console.log(newInputArray);
      // brain.classify(inputs, gotResult);
    } else {
      setTimeout(() => {
        classifyPose();
      }, 100);
    }
  };

  const gotResult = (error, results) => {
    // console.log(results);
    // console.log(results[0].label);
    if (error) {
      console.error(error);
    }
    if (results) {
      console.log(results);
      setFianlResult(results[0].label);
      classifyPose();
    }
  };

  useEffect(() => {
    if (isFianlReady) {
      console.log(inputs);
      brain.classify(inputs, gotResult);
    }
  }, [inputs]);

  useEffect(() => {
    if (myModelisReady) {
      // console.log(myModel);
      brain.load(myModel, myModelReady);
    }
  }, [myModel]);

  return <button onClick={onLoadModel}>Load Model</button>;
}
