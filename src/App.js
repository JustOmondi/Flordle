import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from'react';
import Flordle from './components/Flordle';
import { countries } from './data/gameData'

function App() {
  const [solution, setSolution] = useState({code: "AND", name: "Andorra", code2: "AD"})
  const [selectedCountries, setSelectedCountries] = useState([])

  
  useEffect(() => {
    const getRandomCountry = () => {
 
      let randomNumber = Math.floor(Math.random() * countries.length)
  
      while (selectedCountries.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * countries.length)
      }
  
      setSelectedCountries((prevSelected) => [...prevSelected, randomNumber])
  
      setSolution(countries[randomNumber])
    }
    
    getRandomCountry()
  }, [])
  
  
  return (
    <div className="App">
      <Flordle solution={solution}/>
    </div>
  );
}

export default App;
