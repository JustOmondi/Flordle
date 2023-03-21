import React, { useEffect, useState } from 'react'
import useFlordle from '../hooks/useFlordle'
import Grid from './Grid.js'
import Keypad from './Keypad.js'
import Modal from './Modal'
import { InformationCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

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

  const hideModal = () => {
    setShowModal(false);
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
        <header className="bg-white border-b-2 border-grey-300 mb-2">
          <nav className="mx-auto flex w-1/4 justify-between p-2 lg:px-4" aria-label="Global">
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <p className="">Flordle: {solution.name}</p>
              </a>
            </div>
            <div className='flex'>
              <div onClick={() => {setShowModal(true)}} className="pointer-events-auto rounded-full p-1 text-gray-400 hover:text-black focus:outline-none">
                <span className="sr-only">Info</span>
                <InformationCircleIcon className="h-6 w-6 mr-3" />
              </div>
              <div onClick={resetGame} className="pointer-events-auto rounded-full p-1 text-gray-400 hover:text-black focus:outline-none">
                <span className="sr-only">Reset</span>
                <ArrowPathIcon className="h-6 w-6" />
              </div>
            </div>
            
          </nav>
        </header>
        <div className='flex p-6 content-center justify-center items-center drop-shadow-lg rounded-xl overflow-hidden'>
          <img className="rounded-2xl" src={`${process.env.PUBLIC_URL}${flagURL}`} alt="flag"/>
        </div>
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} maxLetters={MAX_LETTERS} solution={solution.name}/>
        <Keypad usedKeys={usedKeys}/>
        {showModal && (
          <Modal 
            isCorrect={isCorrect}
            turn={turn}
            solution={solution.name}
            resetGame={resetGame}
            maxTurnsReached={turn > NUMBER_OF_TURNS-1}
            hideModal={hideModal}/>
        )}
    </div>
  )
}
