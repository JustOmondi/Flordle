import React, { useEffect, useState } from 'react'
import useFlordle from '../hooks/useFlordle'
import Grid from './Grid.js'
import Keypad from './Keypad.js'
import GameOverModal from './GameOverModal'


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
    resetGame,
    turn,
    usedKeys
  } = useFlordle(solution)

  function handleSkip() {
    resetGame();
    skipToNext();
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
        <h3> Solution is = {solution.name}</h3>
        <div className='flex p-8 content-center justify-center items-center drop-shadow-lg rounded-xl overflow-hidden'>
          <img className="rounded-2xl" src={`${process.env.PUBLIC_URL}${flagURL}`} alt="flag"/>
        </div>
        <div onClick={handleSkip}>Skip</div>
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} maxLetters={MAX_LETTERS}/>
        <Keypad usedKeys={usedKeys}/>
        {showModal && <GameOverModal isCorrect={isCorrect} turn={turn} solution={solution.name} />}
    </div>
  )
}
