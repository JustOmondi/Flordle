import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid.js'
import Keypad from './Keypad.js'

export default function Wordle({solution}) {
    const {currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys, NUMBER_OF_TURNS} = useWordle(solution)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        // Stop processing key events if correct answer given or number of turns reached
        if (isCorrect || turn > NUMBER_OF_TURNS-1) {
          window.removeEventListener('keyup', handleKeyup)
        }

        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup, isCorrect, turn, NUMBER_OF_TURNS])

    useEffect(() => {
      console.log(guesses, turn, isCorrect);
    

    }, [guesses, isCorrect, turn])
    

  return (
    <div>
        <h3> Solution is = {solution}</h3>
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn}/>
        <Keypad usedKeys={usedKeys}/>
    </div>
  )
}
