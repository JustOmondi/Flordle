import React, { useEffect, useState } from 'react'
import useFlordle from '../hooks/useFlordle'
import Grid from './Grid.js'
import Keypad from './Keypad.js'
import GameOverModal from './GameOverModal'

export default function Flordle({solution, flagURL}) {
    const {currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys, NUMBER_OF_TURNS, MAX_LETTERS} = useFlordle(solution)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        // Stop processing key events if correct answer given or number of turns reached
        if (isCorrect || turn > NUMBER_OF_TURNS-1) {
          setTimeout(()=> setShowModal(true), 2000)
          window.removeEventListener('keyup', handleKeyup)
        }

        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup, isCorrect, turn, NUMBER_OF_TURNS])
    
  return (
    <div>
        <h3> Solution is = {solution.name}</h3>
        <img src={flagURL} alt="flag"/>
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} maxLetters={MAX_LETTERS}/>
        <Keypad usedKeys={usedKeys}/>
        {showModal && <GameOverModal isCorrect={isCorrect} turn={turn} solution={solution.name} />}
    </div>
  )
}
