import './App.css';
import { JsonDiff } from './lib/jsonDiff';

function App() {
  const a = {
    "a": {
      "v": 1
    },
    "b": 2,
    "c": [
      1,
      2,
      [
        3,
        4
      ],
      {
        "a": 1,
        "b": 2
      }
    ],
    "d": {
      "l": 0,
      "2": 2,
      "c": [9, 10],

    },
    "v": 1,
    "c1": [{ a: 2, b: { n: 1, c: 2 } }]
  };
  const b = {
    "z": 1,
    "z1": 2,
    "a": {
      "n": 1,
      "m": 2
    },
    "b": "change",
    "d": {
      "l": 0,
      "2": 2,
      "c": [91, 10],

    },
    "c": [
      1,
      2,

      [
        3,
        4,
        6
      ],
      {
        "a": 1,
        "b": 20,
        "kk": 11
      }

    ],
    "ll":{
      "b":"bat"

    }
  }
  return (
    <div className="App">
      <div style={{ height: "100%" }}>
        <JsonDiff 
        
        a={a}
        b={b}/>
      </div>
    </div>
  );
}

export default App;
