import React, { useState } from "react";
import "./App.css";
import WebCamera from "./components/WebCamera";
import NeuralNetwork from "./components/NeuralNetwork";
import Counter from "./components/Counter";
// import P5 from "./components/P5";
import counterLogin from "./components/counterLogin";

function App() {
  const [appFianlResult, setAppFianlResult] = useState("YES");

  return (
    <div className="App">
      <header className="App-header">
        <Counter appFianlResult={appFianlResult} />
        <NeuralNetwork
          appFianlResult={appFianlResult}
          setAppFianlResult={setAppFianlResult}
        />
        <WebCamera />
      </header>
    </div>
  );
}

export default App;
