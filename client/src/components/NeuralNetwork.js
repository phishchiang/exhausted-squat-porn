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

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

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

  const classes = useStyles();

  const classifyImg = () => {
    // const video = document.getElementById("video");

    poseNet = ml5.poseNet(webcamRef.current.video, () =>
      console.log("PoseNet Model Loaded!")
    );
    poseNet.on("pose", gotPoses);

    let options = {
      inputs: 34,
      outputs: 2,
      task: "classification",
      debug: true
    };

    neuralNetwork = ml5.neuralNetwork(options);
    // neuralNetwork.loadData(myData, dataReady);
    // neuralNetwork.loadData("./data.json", dataReady);
    // setBrain(ml5.neuralNetwork(options));
    // video.style.visibility = "hidden";

    // Hide the original webcam video element
    // webcamRef.current.video.style.display = "none";
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
    console.log("reading the brain");
    console.log(neuralNetwork);
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
    if (results[0].confidence > 0.75) {
      // console.log(results[0].confidence);
      // setFianlResult(results[0].label);
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
      console.log(label);
    }
    // If got the new pose, and ready to get the final result
    if (isFianlReady) {
      // console.log(inputs);
      neuralNetwork.classify(inputs, gotResult);
    }
  }, [pose]);

  useEffect(() => {
    if (stateData === "collecting") neuralNetwork.addData(inputs, [label]);
  }, [inputs]);

  useEffect(() => {
    if (myModel) {
      // console.log(myModel);
      neuralNetwork.load(myModel, myModelReady);
    }
  }, [myModel]);

  return (
    <Fragment>
      <div className={classes.root}>
        {/* <Button variant="contained" onClick={onLoadModel}>
          Play
        </Button> */}
      </div>
      <VideoPlayer appFianlResult={appFianlResult} setMyModel={setMyModel} />
      {/* <div className={classes.root}>
        <Button variant="contained">Default</Button>
        <Button variant="contained" color="primary">
          Primary
        </Button>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>
        <Button variant="contained" disabled>
          Disabled
        </Button>
        <Button variant="contained" color="primary" href="#contained-buttons">
          Link
        </Button>
      </div> */}
      <P5 appFianlResult={appFianlResult} pose={pose} />

      {/* <button onClick={() => collectData("NO")}>Collect data NO</button>
      <button onClick={() => collectData("middle")}>Collect data M</button>
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
