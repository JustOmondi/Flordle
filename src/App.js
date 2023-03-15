import logo from './logo.svg';
import './App.css';
import Flordle from './components/Flordle';
import React, { useEffect, useState } from 'react'
import { countries } from './data/gameData.js'

function App() {
  const [solution, setSolution] = useState({code: "AND", name: "Andorra", code2: "AD"})
  const [selectedCountries, setSelectedCountries] = useState([])

  function getRandomCountry () {
      let randomNumber = Math.floor(Math.random() * countries.length)

      while (selectedCountries.includes(randomNumber)) {
          randomNumber = Math.floor(Math.random() * countries.length)
      }

      setSelectedCountries((prevSelected) => [...prevSelected, randomNumber])

      return countries[randomNumber];
  }

  useEffect(() => {
    setSolution(getRandomCountry());
  }, [])

  function skipToNext () {
    setSolution(getRandomCountry())
  }

  return (
    <div className="App">
      <Flordle solution={solution} skipToNext={skipToNext}/>
    </div>
  );
}

export default App;
