import logo from './logo.svg';
import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [input, setInput] = useState("");
  useEffect(() => {
    if (input.length) {
      alert(input);
    }
  }, [input]);
  function getInput() {
    setInput(document.getElementById("input-text").value);
  };
  return (
    <div>
      <div class="App-header">
        <h1>Trout Population Forecast</h1>
      </div>
      <div class="App-input">
        <div class="input-inline">
          <input type="text" id="input-text" placeholder="Write something here..."></input>
          <input type="button" value="Forecast" onClick={getInput}></input>
        </div>
      </div>
      <div class="App-water">
        <div class="water-wave">
          <span class="wave"></span>
          <span class="deep-water"></span>
        </div>
      </div>
    </div>    
  );
}

export default App;
