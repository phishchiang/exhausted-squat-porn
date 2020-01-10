import React, { useEffect, useState, Fragment, useRef } from "react";
import * as ml5 from "ml5";
import P5 from "./P5";
import VideoPlayer from "./VideoPlayer";

import {
  DATA_JSON_URL,
  MODEL_JSON_URL,
  MODEL_META_JSON_URL,
  MODEL_WEIGHTS_BIN_URL
} from "./url";

let poseNet;
let neuralNetwork;

export default function NeuralNetwork({
  appFianlResult,
  setAppFianlResult,
  webcamRef
}) {
  const [pose, setPose] = useState(null);
  const [stateData, setStateData] = useState("waiting");
  const [inputs, setInputs] = useState([]);
  const [label, setLabel] = useState(null);
  const [myModel, setMyModel] = useState(null);
  const [isFianlReady, setIsFianlReady] = useState(false);

  const classifyImg = () => {
    // To Get the PoseNet Pre-trained Model from Google and Setup up users' cam as input
    poseNet = ml5.poseNet(webcamRef.current.video, () =>
      console.log("PoseNet Model Loaded!")
    );

    // Setup the callback once it find any pose.
    poseNet.on("pose", gotPoses);

    // Setup basic config for our nerual network
    let options = {
      inputs: 34, // The total Array length of every keypoinst. ( nose, eyes, ear...etc)
      outputs: 4, // The number of label that we assigned ( in my case, I only have either "Do Squats" or "Not" )
      task: "classification", // This type will give you the discrete reslut that we labeled
      debug: true // Give you a UI while training the data.
    };

    neuralNetwork = ml5.neuralNetwork(options);
  };

  const gotPoses = poses => {
    if (poses.length > 0) {
      setPose(poses[0].pose);
    }
  };

  const collectData = label => {
    setTimeout(() => {
      setStateData("collecting");
      setLabel(label);
      setTimeout(() => {
        setStateData("waiting");
        setLabel(null);
      }, 10000);
    }, 3000);
  };

  const dataReady = () => {
    neuralNetwork.normalizeData();
    neuralNetwork.train({ epochs: 100 }, trainFinished);
  };

  const trainFinished = () => {
    console.log("model trained");
    neuralNetwork.save();
  };

  const onLoadModel = () => {
    setMyModel({
      model: MODEL_JSON_URL,
      metadata: MODEL_META_JSON_URL,
      weights: MODEL_WEIGHTS_BIN_URL
    });
    // setStartPlay(!startPlay);
  };

  const myModelReady = () => {
    console.log("My own model ready!!!");
    if (pose == null) {
      // setAppFianlResult("NO");
    }
    classifyPose();
  };

  const classifyPose = () => {
    setIsFianlReady(true);
    if (pose) {
      let newInputArray = pose.keypoints
        .map(item => {
          return [item.position.x, item.position.y];
        })
        .flat();
      setInputs(newInputArray);
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
    if (results[0].confidence > 0.7) {
      setAppFianlResult(results[0].label);
    }

    classifyPose();
  };

  // 1. Component entry point
  useEffect(() => {
    if (webcamRef) {
      webcamRef.current.video.style.display = "none";
    }
    classifyImg();
  }, []);

  // 2. If there's new pose and start collecting data
  useEffect(() => {
    if (stateData === "collecting") {
      // Flaten the position array and add to the
      let newInputArray = pose.keypoints
        .map(item => {
          return [item.position.x, item.position.y];
        })
        .flat();
      setInputs(newInputArray);
    }
    // If got the new pose, and ready to get the final result
    if (isFianlReady) {
      neuralNetwork.classify(inputs, gotResult);
    }
    // console.log(pose);
  }, [pose]);

  useEffect(() => {
    if (stateData === "collecting") neuralNetwork.addData(inputs, [label]);
  }, [inputs]);

  useEffect(() => {
    if (myModel) {
      // console.log(myModel);
      neuralNetwork.load(myModel, myModelReady);
    }
    if (pose == null && myModel !== null) {
      setAppFianlResult("NO");
    }
  }, [myModel]);

  return (
    <Fragment>
      {/* <div className={classes.root}>
        <Button variant="contained" onClick={onLoadModel}>
          Play
        </Button>
      </div> */}
      <VideoPlayer appFianlResult={appFianlResult} setMyModel={setMyModel} />

      <P5 appFianlResult={appFianlResult} pose={pose} />

      {/* <button onClick={() => collectData("NO")}>Collect data NO</button>
      <button onClick={() => collectData("C")}>Collect data C</button>
      <button onClick={() => collectData("M")}>Collect data M</button>
      <button onClick={() => collectData("YES")}>Collect data YES</button>
      <button onClick={() => neuralNetwork.saveData()}>Save data</button>
      <button onClick={() => neuralNetwork.loadData(DATA_JSON_URL, dataReady)}>
        Load Data
      </button>
      <h1>{pose == null ? "loading..." : Math.floor(pose.nose.x)}</h1>
      <h2>{stateData}</h2> */}
    </Fragment>
  );
}
