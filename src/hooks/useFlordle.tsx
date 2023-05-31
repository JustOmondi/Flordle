import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { keypadLetters } from '../data/gameData'

export const GREEN: string = 'green'
export const YELLOW: string = 'yellow'
export const GREY: string = 'gray'
export const SELECTED_GREY: string = 'selected-gray'
const NUMBER_OF_TURNS: number = 5

const useFlordle = (solution: {
    name: string,
    code: string,
    code2: string
  }) => {

    const [turn, setTurn] = useState<number>(0)
    const [currentGuess, setCurrentGuess] = useState<string>('')
    const [guesses, setGuesses] = useState<{key: string, colour: string}[][]>([...Array(NUMBER_OF_TURNS)]) // Array of all the guesses made
    const [history, setHistory] = useState<string[]>([])
    const [isCorrect, setIsCorrect] = useState<boolean>(false)
    const [usedKeys, setUsedKeys] = useState<{[letter: string]: {value: string, colour: string}}>(keypadLetters)

    const MAX_LETTERS: number = solution.name.length

    const flagURL: string = `/flags/${solution.code2.toLowerCase()}.svg`;

    const resetState = () => {
        setGuesses([...Array(NUMBER_OF_TURNS)])
        setTurn(0);
        setCurrentGuess('');
        setHistory([]);
        setIsCorrect(false);
        setUsedKeys(keypadLetters)
    }

    // Format a guess into array of objects i.e. [key: 'x', colour: 'yellow']
    const formatGuess = (): {key: string, colour: string}[] => {
        const solutionArray: string[] = [...solution.name.toLowerCase().replaceAll(" ", "_")]

        const formattedGuess: {key: string, colour: string}[] = [...currentGuess].map((letter) => {
            return { key: letter, colour: GREY }
        })

        // Step 1: Find letters guessed that are in the right position
        formattedGuess.forEach((letter, i) => {
            if (solutionArray[i] === letter.key) {
                formattedGuess[i].colour = GREEN
                solutionArray[i] = ''
            }
        });

        // Step 2: Find any letters that are in the word but not in the right position
        formattedGuess.forEach((letter, i) => {
            if (solutionArray.includes(letter.key) && letter.colour !== GREEN) {
                formattedGuess[i].colour = YELLOW
                solutionArray[solutionArray.indexOf(letter.key)] = ''
            }
        })

        return formattedGuess
    }

    // Add a new guess to the running list of guesses and update the turn
    const addNewGuess = (formattedGuess: {key: string, colour: string}[]) => {
        if (currentGuess.toLowerCase() === solution.name.toLowerCase()) {
            setIsCorrect(true);
        }

        setGuesses((prev) => {
            const newGuesses: {key: string, colour: string}[][] = [...prev]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })

        setHistory((prev) => [...prev, currentGuess])

        setTurn((prev) => prev + 1)

        setUsedKeys((prev) => {
            const newUsedKeys = { ...prev }

            formattedGuess.forEach((letter, i) => {

                // Only check for colour if the key is not a space
                if (letter.key !== ' ') {
                    const currentColour: string = newUsedKeys[letter.key].colour

                    if (letter.colour === GREEN) {
                        newUsedKeys[letter.key] = { value: letter.key, colour: GREEN }
                        return
                    }

                    if (letter.colour === YELLOW && currentColour !== GREEN) {
                        newUsedKeys[letter.key] = { value: letter.key, colour: YELLOW }
                        return
                    }

                    if (letter.colour === GREY && currentColour !== GREEN && currentColour !== YELLOW) {
                        newUsedKeys[letter.key] = { value: letter.key, colour: SELECTED_GREY }
                        return
                    }
                }
            })

            return newUsedKeys
        })

        // Reset current guess string for a new guess
        setCurrentGuess('')
    }

    const processKeyInput = (key: string) => {
        if (key === 'Backspace') {
            // Check if last character was space and delete last 2 characters
            if (currentGuess.indexOf(' ') === currentGuess.length - 1) {
                setCurrentGuess((prev) => prev.slice(0, -2))
            } else {
                setCurrentGuess((prev) => prev.slice(0, -1))
            }
        }

        // Check that the entered character is a letter
        if (/^[a-zA-Z]$/.test(key)) {
            if (currentGuess.length < MAX_LETTERS) {
                // Check if the next character at the current index of the current guess in the solution is a space and add space in current guess
                if (solution.name.indexOf(' ') === currentGuess.length) {
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
                if (solution.name.includes(' ')) {
                    toast(`Your guess must be ${solution.name.length - 1} letters long`);
                } else {
                    toast(`Your guess must be ${solution.name.length} letters long`);
                }

                return;
            }

            const formattedGuess: {key: string, colour: string}[] = formatGuess()

            addNewGuess(formattedGuess)
        }
    }

    const handleKeyup = ({ key }: {key: string}) => {
        processKeyInput(key);
    }

    return {
        turn,
        currentGuess,
        guesses,
        isCorrect,
        usedKeys,
        flagURL,
        handleKeyup,
        processKeyInput,
        NUMBER_OF_TURNS,
        MAX_LETTERS,
        resetState
    }
}

export default useFlordle 