import React, { useEffect, useState } from 'react'
import useFlordle from '../hooks/useFlordle'
import Grid from './Grid.js'
import Keypad from './Keypad.js'
import Modal from './Modal'

export default function Flordle({solution, flagURL}) {
    const {currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys, NUMBER_OF_TURNS} = useFlordle(solution)
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

    useEffect(() => {
      console.log(guesses, turn, isCorrect);
    

    }, [guesses, isCorrect, turn])
    

  return (
    <div>
        <h3> Solution is = {solution.name}</h3>
        <img src={flagURL} alt="flag"/>
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn}/>
        <Keypad usedKeys={usedKeys}/>
        {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
    </div>
  )
}
