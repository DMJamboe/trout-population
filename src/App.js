import logo from './logo.svg';
import { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import './App.css';
let data = [{population: 10000},{population: 10000}];
let current = 10000;

function App() {
  const [input, setInput] = useState("");
  const [graphData, setGraphData] = useState([{population: 10000},{population: 10000}]);
  useEffect(() => {
    if (input.length) {
      fetch(`http://127.0.0.1:8000/classify/"${input}"`, {method: "GET", mode: "cors"}).then(response => {
        if (response.ok) {
          return response.json();
        }
      }).then(data => {
        console.log(data.tag)
        const tag = data.tag;
        const confidence = data.confidence;
        switch (tag) {
          case "Decrease in population": changeWaterLevel('low'); setGraphData(oldData => [...oldData, {population: current - 6000*confidence}]); console.log(graphData); break; 
          case "Increase in population": changeWaterLevel('high'); setGraphData(oldData => [...oldData, {population: current + (Math.ceil(Math.random() * 500) * (Math.round(Math.random()) ? 1 : -1))*confidence}]);console.log(graphData); break;
          case "Neutral effect on population": changeWaterLevel('neutral'); setGraphData(oldData => [...oldData, {population: current + 6000*confidence}]); console.log(graphData); break;
        }
      }).catch(err => {
        alert(err);
      });
    }
  }, [input]);
  function getInput() {
    console.log("IGFG")
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
      <div class="Stocks" style={{zIndex:1, position: 'relative', top: -100, marginBottom: -10000}}>
        <ResponsiveContainer width="100%" height={100}>
          <AreaChart width={600} height={500} data={graphData} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <Area type="monotone" dataKey="population" stroke="#134285" fill="#134285" fillOpacity={1}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>    
  );
}

function changeWaterLevel(level) {
  document.getElementById("water-wave").setAttribute("class", `water-wave ${level}`);
}

export default App;
