import logo from './logo.png';
import { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import './App.css';
let data = [{time: 1, population: 10000},{time: 1, population: 240000},{time: 2, population: 270000}];

let currentFish = 1;

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
    //updateFish("increase in population");
    //updateFish("decrease in population");
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
      currentFish--;

      const fish = document.getElementById(currentFish);
      fish.remove();


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
      <div class="Stocks">
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart width={600} height={300} data={data}>
            <Area type="monotone" dataKey="population" stroke="#134285" fill="#134285" fillOpacity={1}/>
            {/*<CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />*/}
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
