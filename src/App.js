import logo from './logo.png';
import { useEffect, useState } from "react";
import './App.css';

let currentFish = 1;

function App() {
  
  const [input, setInput] = useState("");
  useEffect(() => {
    if (input.length) {
      alert(input);
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
        <div className="water-wave" id="water-wave">
          <span className="wave"></span>
          <span className="deep-water"></span>
        </div>
      </div>
    </div>
       
  );
}

export default App;
