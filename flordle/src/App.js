import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from'react';
import Flordle from './components/Flordle';
import { countries } from './data/gameData'

function App() {
  const [solution, setSolution] = useState({code: "AND", name: "Andorra"})
  const [urlValid, setUrlValid] = useState(false)
  const [flagURL, setFlagURL] = useState('https://countryflagsapi.com/svg/ZAF')
  const [selectedCountries, setSelectedCountries] = useState([1000])

  
  useEffect(() => {
    const getRandomCountry = () => {

      let s = selectedCountries
  
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
      <Flordle solution={solution} flagURL={flagURL}/>
    </div>
  );
}

export default App;
