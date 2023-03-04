import logo from './logo.png';
import { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import './App.css';
let data = [{population: 10000},{population: 10000}];
let current = 10000;

let currentFish = 1;
let minfish = 1;

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
          case "Decrease in population": changeWaterLevel('low'); updateFish("decrease in population"); setGraphData(oldData => [...oldData, {population: current - 6000*confidence}]); console.log(graphData); break; 
          case "Increase in population": changeWaterLevel('high'); updateFish("increase in population"); setGraphData(oldData => [...oldData, {population: current + (Math.ceil(Math.random() * 500) * (Math.round(Math.random()) ? 1 : -1))*confidence}]);console.log(graphData); break;
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
  function generateRandom(min, max) {

    // find diff
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.floor( rand * difference);

    // add with min value 
    rand = rand + min;

    return rand;
}
  function updateFish(change){
    if(change === "increase in population"){
      //addFish()

      // calculate size of div
      var height = document.getElementById('water-wave').offsetHeight;
      var width = document.getElementById("water-wave").offsetWidth;

      var fishHeight = height;
      var fishWidth = width;

      // generate random height and width for placement of fish in range
      fishHeight = generateRandom(200, fishHeight);
      fishWidth = generateRandom(0, fishWidth);

      // add fish image
      var newFish = document.createElement("img");
      newFish.src = logo;
      newFish.id = currentFish;

      var fishStyle = "position:absolute; left:";
      fishStyle = fishStyle.concat(fishWidth, "px; top:");
      fishStyle = fishStyle.concat(fishHeight, "px;");

      newFish.style=fishStyle;
      newFish.className = "fish";
      document.body.appendChild(newFish);
      
      // increment number of fish
      currentFish++;
    }
    if(change === "decrease in population"){
      //removeFish()
      
      // decrement number of fish
      if (currentFish > minfish){
        currentFish--;

        const fish = document.getElementById(currentFish);
        fish.remove();
      }


      
    }
  };
  
  return (
    <div>
      <div className="App-header">
        <h1>Trout Population Forecast</h1>
      </div>
      <div className="App-input">
        <div className="input-inline">
          <input type="text" id="input-text" placeholder="Write something here..."></input>
          <input type="button" value="Forecast" onClick={getInput}></input>
        </div>
      </div>
      <div className="App-water">
        <div className="water-wave neutral" id="water-wave">
          <span className="wave"></span>
          <span className="deep-water"></span>
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
