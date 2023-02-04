import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from'react';
import Flordle from './components/Flordle';

function App() {
  const [solution, setSolution] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/solutions')
    .then(res => res.json())
    .then(json => {
      const randomSolution = json[Math.floor(Math.random() * json.length)];

      setSolution(randomSolution.word);
    });
  }, [setSolution]);
  
  return (
    <div className="App">
      {solution && <Flordle solution={solution}/>}
    </div>
  );
}

export default App;
