import logo from './logo.svg';
import { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import './App.css';
let data = [{time: 1, population: 10000},{time: 1, population: 240000},{time: 2, population: 270000}];

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

export default App;
