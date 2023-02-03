import {useState} from 'react'

const GREEN = 'green'
const YELLOW = 'yellow'
const GREY = 'grey'

const useWordle = (solution) => {
    
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([]) // Array of all the guesses made
    const [history, setHistory] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)

    //Format a guess into array of objects i.e. [key: 'x', colour: 'yellow']
    const formatGuess = () => {
        const solutionArray = [...solution]

        const formattedGuess = [...currentGuess].map((letter)=> {
            return {key: letter, colour: GREY}
        })


        // Step 1: Find letters guessed that are in the right position
        formattedGuess.forEach((letter, i) => {
            if (solutionArray[i] === letter.key) {
                formattedGuess[i].colour = GREEN
                solutionArray[i] = null
            }
        });

        // Step 2: Find any letters that are in the word but not in the right position
        formattedGuess.forEach((letter, i) => {
            if (solutionArray.includes(letter.key) && letter.colour !== GREEN) {
                formattedGuess[i].colour = YELLOW
                solutionArray[solutionArray.indexOf(letter.key)] = null
            }
        })

        return formattedGuess
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

            setHistory((prev) => [...prev, currentGuess])

            console.log(formatGuess())
        }
    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyup}
}

export default useWordle 