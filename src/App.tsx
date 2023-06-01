import React, { useEffect, useState } from 'react';
import Flordle from './components/Flordle';
import { countries } from './data/gameData';

const App: React.FC = () => {
  const [solution, setSolution] = useState<{code: string, name: string, code2: string}>({ code: "AND", name: "Andorra", code2: "AD" })
  const [selectedCountries, setSelectedCountries] = useState<number[]>([])

  const getRandomCountry = () => {
    let randomNumber: number = 0
    let found: boolean = false

    while (!found) {
      randomNumber = Math.floor(Math.random() * countries.length)

      if (!selectedCountries.includes(randomNumber)) {

        // Restrict solutions to names with a maximum of 6 letters on mobile
        if (window.innerWidth <= 600) {
          if (countries[randomNumber].name.length <= 6) {
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
