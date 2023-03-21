import React, { useEffect, useState } from 'react'
import useFlordle from '../hooks/useFlordle'
import Grid from './Grid.js'
import Keypad from './Keypad.js'
import Modal from './Modal'
import Nav from './Nav'
import { Toaster } from 'react-hot-toast'

export default function Flordle({solution, skipToNext}) {
  const [mainModalVisible, setMainModalVisible,] = useState(false)
  const [infoModalVisible, setInfoModalVisible] = useState(false)
  
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
    hideMainModal();
    hideInfoModal();
    resetState();
    skipToNext();
  }

  const showMainModal = () => {
    setMainModalVisible(true);
  }

  const hideMainModal = () => {
    setMainModalVisible(false);
  }

  const hideInfoModal = () => {
    setInfoModalVisible(false);
  }

  const showInfoModal = () => {
    setInfoModalVisible(true);
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)

    // Stop processing key events if correct answer given or number of turns reached
    if (isCorrect || turn > NUMBER_OF_TURNS-1) {
      setTimeout(showMainModal, 500)
      window.removeEventListener('keyup', handleKeyup)
    }

    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup, isCorrect, turn, NUMBER_OF_TURNS])
    
  return (
    <div>
        <div><Toaster toastOptions={{
          className: '',
          duration: 2000,
          style: {
            background: '#fef3c7',
            color: '#000',
          }}}/>
        </div>
        <Nav showInfoModal={showInfoModal} resetGame={resetGame} solutionName={solution.name} />
        <div className='flex p-6 content-center justify-center items-center drop-shadow-lg rounded-xl overflow-hidden'>
          <img className="rounded-2xl" src={`${process.env.PUBLIC_URL}${flagURL}`} alt="flag"/>
        </div>
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} maxLetters={MAX_LETTERS} solutionName={solution.name}/>
        <Keypad usedKeys={usedKeys}/>
        {(mainModalVisible || infoModalVisible) && (
          <Modal 
            isCorrect={isCorrect}
            turn={turn}
            solutionName={solution.name}
            resetGame={resetGame}
            infoModalVisible={infoModalVisible}
            hideMainModal={hideMainModal}
            hideInfoModal={hideInfoModal}/>
        )}
    </div>
  )
}
