import React, { useState, useRef } from "react";
import "./App.css";
import WebCamera from "./components/WebCamera";
import NeuralNetwork from "./components/NeuralNetwork";
import Counter from "./components/Counter";
// import P5 from "./components/P5";
import counterLogin from "./components/counterLogin";

function App() {
  const [appFianlResult, setAppFianlResult] = useState("YES");
  const webcamRef = useRef(null);

  return (
    <div className="App">
      <header className="App-header">
        <h2>🔞Exhausted Squat Porn🔞</h2>
        {/* <Counter appFianlResult={appFianlResult} /> */}
        <NeuralNetwork
          appFianlResult={appFianlResult}
          setAppFianlResult={setAppFianlResult}
          webcamRef={webcamRef}
        />
        <WebCamera webcamRef={webcamRef} />
      </header>
    </div>
  );
}

export default App;
