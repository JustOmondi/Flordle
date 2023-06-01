import React, { useEffect, useState } from 'react'
import ConfettiExplosion from 'react-confetti-explosion'
import { Toaster } from 'react-hot-toast'
import useFlordle from '../hooks/useFlordle'
import { getCookie, setCookie } from '../utils'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'
import Nav from './Nav'

interface Props {
  solution: {
    name: string,
    code: string,
    code2: string
  },
  skipToNext: () => void
}

 const Flordle: React.FC<Props> = ({ solution, skipToNext }) => {
  const [mainModalVisible, setMainModalVisible,] = useState<boolean>(false)
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false)

  const {
    currentGuess,
    handleKeyup,
    flagURL,
    guesses,
    isCorrect,
    MAX_LETTERS,
    NUMBER_OF_TURNS,
    processKeyInput,
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
    // Use cookie to determine whether to show/hide info modal when app loaded
    if (!getCookie()) {
      setInfoModalVisible(true);
      setCookie()
    }

    window.addEventListener('keyup', handleKeyup)

    // Stop processing key events if correct answer given or number of turns reached
    if (isCorrect || turn > NUMBER_OF_TURNS - 1) {
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
        }
      }} />
      </div>
      {isCorrect && <ConfettiExplosion particleCount={200} height={'150vh'} width={3000} duration={3000} />}
      <Nav showInfoModal={showInfoModal} resetGame={resetGame} flagCode={solution.code2} />
      <div className='flex p-6 content-center justify-center items-center drop-shadow-lg rounded-xl overflow-hidden'>
        <img className="flag-image rounded-2xl w-1/3 lg:w-1/12" src={`${process.env.PUBLIC_URL}${flagURL}`} alt="flag" />
      </div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} maxLetters={MAX_LETTERS} solutionName={solution.name} />
      <Keypad usedKeys={usedKeys} processKeyInput={processKeyInput} />
      {(mainModalVisible || infoModalVisible) && (
        <Modal
          isCorrect={isCorrect}
          turn={turn}
          solutionName={solution.name}
          resetGame={resetGame}
          infoModalVisible={infoModalVisible}
          hideMainModal={hideMainModal}
          hideInfoModal={hideInfoModal} />
      )}
    </div>
  )
}

export default Flordle
