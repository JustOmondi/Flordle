import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from'react';
import Flordle from './components/Flordle';
import { countries } from '../data/countryCodes'

function App() {
  const [solution, setSolution] = useState({})
  const [urlValid, setUrlValid] = useState(false)
  const [flagURL, setFlagURL] = useState('https://countryflagsapi.com/svg/ZAF')
  const [selectedCountries, setSelectedCountries] = useState([])

  

  useEffect(() => {
    const getRandomCountry = () => {

      let randomNumber = Math.floor(Math.random() * countries.length)
  
      while (selectedCountries.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * countries.length)
      }
  
      setSelectedCountries((prevSelected) => [...prevSelected, randomNumber])
  
      return countries[randomNumber]
    }

    while (!urlValid) {
      setSolution(getRandomCountry())

      const flagURL = `https://countryflagsapi.com/svg/${solution.code}`

      fetch(flagURL)
      .then(response => {
        if (response.ok) {
          setFlagURL(flagURL)
          setUrlValid(true) 
        } else {
          setUrlValid(false) 
        }
      })
    }
  }, [selectedCountries, solution, urlValid])
  
  return (
    <div className="App">
      {solution && <Flordle solution={solution} flagURL={flagURL}/>}
    </div>
  );
}

export default App;
