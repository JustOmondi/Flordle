import {useState} from 'react'

const useWordle = () => {
    
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([]) // Array of all the guesses made
    const [history, setHistory] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)

    //Format a guess into array of objects i.e. [key: 'x', colour: 'yellow']
    const formatGuess = () => {
        console.log(`formatting current guess - ${currentGuess}`)

    }

    // Add a new guess to the running list of guesses
    const addNewGuess = (newGuess) => {
        setGuesses((prev) => {
            return [...prev, [newGuess]]
        })
    }

    //Handle keyup events i.e. when letters are pressed or Enter is pressed
    const handleKeyup = ({key}) => {
        if (key === 'Backspace') {
            setCurrentGuess((prev) => prev.slice(0, -1))
        }

        // Check that the entered is a valid letter
        if (/^[a-zA-Z]$/.test(key)) {
            if(currentGuess.length < 5) {
                setCurrentGuess((prev) => prev + key)
            }
        }

        // Add new guess if turns < 5 and current guess has not been entered before
        if (key === 'Enter') {
            if (turn > 5) {
                console.log('All turns have been used up');
                return
            }

            if (history.includes(currentGuess)) {
                console.log('You\'ve already guessed this word');
                return
            }

            if (currentGuess.length !== 5) {
                console.log('Guess must be 5 letters long');
                return
            }

            formatGuess()
        }
    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyup}
}

export default useWordle 