import logo from './logo.svg';
import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [input, setInput] = useState("");
  useEffect(() => {
    if (input.length) {
      fetch(`http://127.0.0.1:8000/classify/"${input}"`, {method: "GET", mode: "cors"}).then(response => {
        if (response.ok) {
          return response.json();
        }
      }).then(data => {
        const tag = data.tag;
        const confidence = data.confidence;
        switch (tag) {
          case "Decrease in population": changeWaterLevel('low'); break;
          case "Increase in population": changeWaterLevel('high'); break;
          case "Neutral effect on population": changeWaterLevel('neutral'); break;
        }
      }).catch(err => {
        alert(err);
      });
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
        <div class="water-wave neutral" id="water-wave">
          <span class="wave"></span>
          <span class="deep-water"></span>
        </div>
      </div>
    </div>    
  );
}

function changeWaterLevel(level) {
  document.getElementById("water-wave").setAttribute("class", `water-wave ${level}`);
}

export default App;
