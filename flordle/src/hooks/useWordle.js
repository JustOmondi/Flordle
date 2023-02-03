import {useState} from 'react'

const useWordle = () => {
    
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([]) // Array of all the guesses made
    const [history, setHistory] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)

    //Format a guess into array of objects i.e. [key: 'x', colour: 'yellow']
    const formatGuess = () => {

    }

    // Add a new guess to the running list of guesses
    const addNewGuess = () => {

    }

    //Handle keyup events i.e. when letters are pressed or Enter is pressed
    const handleKeyUp = () => {

    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyUp}
}

export default useWordle 