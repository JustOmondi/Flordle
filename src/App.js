import React, { useEffect, useState } from 'react';
import './App.css';
import Flordle from './components/Flordle';
import { countries } from './data/gameData.js';

function App() {
  const [solution, setSolution] = useState({ code: "AND", name: "Andorra", code2: "AD" })
  const [selectedCountries, setSelectedCountries] = useState([])

  const getRandomCountry = () => {
    let randomNumber = 0
    let found = false

    while (!found) {
      randomNumber = Math.floor(Math.random() * countries.length)

      if (!selectedCountries.includes(randomNumber)) {

        // Restrict solutions to names with a maximum of 7 letters on mobile
        if (window.innerWidth <= 600) {
          if (countries[randomNumber].name.length <= 7) {
            found = true
          }
        } else {
          found = true
        }
      }
    }

    setSelectedCountries((prevSelected) => [...prevSelected, randomNumber])

    return countries[randomNumber];
  }

  useEffect(() => {
    setSolution(getRandomCountry());
  }, [])

  const skipToNext = () => {
    setSolution(getRandomCountry())
  }

  return (
    <div className="App">
      <Flordle solution={solution} skipToNext={skipToNext} />
    </div>
  );
}

export default App;
