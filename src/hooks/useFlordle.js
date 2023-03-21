import {useState} from 'react'
import { keypadLetters } from '../data/gameData'
import { toast } from 'react-hot-toast'

const GREEN = 'green'
const YELLOW = 'yellow'
const GREY = 'gray'
const SELECTED_GREY = 'selected-gray'
const NUMBER_OF_TURNS = 5

const useFlordle = (solution) => {
    
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(NUMBER_OF_TURNS)]) // Array of all the guesses made
    const [history, setHistory] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState(keypadLetters)

    const MAX_LETTERS = solution.name.length

    const flagURL = `/flags/${solution.code2.toLowerCase()}.svg`;

    const resetState = () => {
        setGuesses([...Array(NUMBER_OF_TURNS)])
        setTurn(0);
        setCurrentGuess('');
        setHistory([]);
        setIsCorrect(false);
        setUsedKeys(keypadLetters)
    }

    //Format a guess into array of objects i.e. [key: 'x', colour: 'yellow']
    const formatGuess = () => {
        const solutionArray = [...solution.name.toLowerCase().replaceAll(" ", "_")]

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
        if (currentGuess.toLowerCase() === solution.name.toLowerCase()) {
            setIsCorrect(true);
        }

        setGuesses((prev) =>  {
            const newGuesses = [...prev]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })

        setHistory((prev) => [...prev, currentGuess])

        setTurn((prev) => prev + 1)

        setUsedKeys((prev) => {
            const newUsedKeys = {...prev}

            formattedGuess.forEach((letter, i) => {

                // Only check for color if the key is not a space
                if(letter.key !== ' ') {
                    const currentColour = newUsedKeys[letter.key].color

                    if (letter.colour === GREEN) {
                        newUsedKeys[letter.key] = {value: letter.key, color: GREEN}
                        return
                    }

                    if (letter.colour === YELLOW && currentColour !== GREEN) {
                        newUsedKeys[letter.key] = {value: letter.key, color: YELLOW}
                        return
                    }

                    if (letter.colour === GREY && currentColour !== GREEN && currentColour !== YELLOW) {
                        newUsedKeys[letter.key] = {value: letter.key, color: SELECTED_GREY}
                        return
                    }
                }
            })

            return newUsedKeys
        })

        // Reset current guess string for a new guess
        setCurrentGuess('')
    }

    //Handle keyup events i.e. when letters are pressed or Enter is pressed
    const handleKeyup = ({key}) => {
        if (key === 'Backspace') {
            // Check if last character was space and delete last 2 characters
            if(currentGuess.indexOf(' ') === currentGuess.length-1) {
                setCurrentGuess((prev) => prev.slice(0, -2))
            } else {
                setCurrentGuess((prev) => prev.slice(0, -1))
            }
        }

        // Check that the entered character is a letter
        if (/^[a-zA-Z]$/.test(key)) {
            if(currentGuess.length < MAX_LETTERS) {
                // Check if the next character at the current index of the current guess in the solution is a space and add space in current guess
                if(solution.name.indexOf(' ') === currentGuess.length) {
                    setCurrentGuess((prevCurrentGuess) => `${prevCurrentGuess} ${key}`.toLowerCase())
                } else {
                    setCurrentGuess((prevCurrentGuess) => `${prevCurrentGuess}${key}`.toLowerCase());
                }
            }
        }

        // Add new guess if turns < 5 and current guess has not been entered before
        if (key === 'Enter') {
            if (turn >= NUMBER_OF_TURNS) {
                toast('All turns have been used up');
                return;
            }

            if (history.includes(currentGuess)) {
                toast('You\'ve already guessed this word');
                return;
            }

            if (currentGuess.length !== MAX_LETTERS) {
                toast(`Your guess must be ${solution.name.length} letters long`);
                return;
            }

            const formattedGuess = formatGuess()

            addNewGuess(formattedGuess)
        }
    }

    return {
        turn,
        currentGuess,
        guesses,
        isCorrect,
        usedKeys,
        flagURL,
        handleKeyup,
        NUMBER_OF_TURNS,
        MAX_LETTERS,
        resetState
    }
}

export default useFlordle 