import {useState} from 'react'

const GREEN = 'green'
const YELLOW = 'yellow'
const GREY = 'grey'
const NUMBER_OF_GUESSES = 6
const MAX_WORD_LENGTH = 5

const useWordle = (solution) => {
    
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(NUMBER_OF_GUESSES)]) // Array of all the guesses made
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

    // Add a new guess to the running list of guesses and update the turn
    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true);
        }

        setGuesses((prev) =>  {
            const newGuesses = [...prev]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })

        setHistory((prev) => [...prev, currentGuess])

        setTurn((prev) => prev + 1)

        // Reset current guess string for a new guess
        setCurrentGuess('')
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
            if (turn > NUMBER_OF_GUESSES) {
                console.log('All turns have been used up');
                return
            }

            if (history.includes(currentGuess)) {
                console.log('You\'ve already guessed this word');
                return
            }

            if (currentGuess.length !== MAX_WORD_LENGTH) {
                console.log(`Guess must be ${MAX_WORD_LENGTH} letters long`);
                return
            }

            const formattedGuess = formatGuess()

            addNewGuess(formattedGuess)
        }
    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyup}
}

export default useWordle 