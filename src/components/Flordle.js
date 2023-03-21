import React, { useEffect, useState } from 'react'
import useFlordle from '../hooks/useFlordle'
import Grid from './Grid.js'
import Keypad from './Keypad.js'
import Modal from './Modal'
import Nav from './Nav'

export default function Flordle({solution, skipToNext}) {
  const [showModal, setShowModal] = useState(false)
  
  const {
    currentGuess,
    handleKeyup,
    flagURL,
    guesses,
    isCorrect,
    MAX_LETTERS,
    NUMBER_OF_TURNS,
    resetState,
    turn,
    usedKeys
  } = useFlordle(solution)

  const resetGame = () => {
    resetState();
    skipToNext();
  }

  const hideMainModal = () => {
    setShowModal(false);
  }

  const showMainModal = () => {
    setShowModal(true);
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)

    // Stop processing key events if correct answer given or number of turns reached
    if (isCorrect || turn > NUMBER_OF_TURNS-1) {
      setTimeout(()=> setShowModal(true), 500)
      window.removeEventListener('keyup', handleKeyup)
    }

    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup, isCorrect, turn, NUMBER_OF_TURNS])
    
  return (
    <div>
        <Nav showMainModal={showMainModal} resetGame={resetGame} solutionName={solution.name} />
        <div className='flex p-6 content-center justify-center items-center drop-shadow-lg rounded-xl overflow-hidden'>
          <img className="rounded-2xl" src={`${process.env.PUBLIC_URL}${flagURL}`} alt="flag"/>
        </div>
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} maxLetters={MAX_LETTERS} solutionName={solution.name}/>
        <Keypad usedKeys={usedKeys}/>
        {showModal && (
          <Modal 
            isCorrect={isCorrect}
            turn={turn}
            solutionName={solution.name}
            resetGame={resetGame}
            maxTurnsReached={turn > NUMBER_OF_TURNS-1}
            hideMainModal={hideMainModal}/>
        )}
    </div>
  )
}
