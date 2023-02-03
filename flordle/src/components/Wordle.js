import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'

export default function Wordle({solution}) {
    const {currentGuess, handleKeyup, guesses, isCorrect, turn} = useWordle(solution)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup])

    useEffect(() => {
      console.log(guesses, turn, isCorrect);
    

    }, [guesses, isCorrect, turn])
    

  return (
    <div>
        <h3> Solution is = {solution}</h3>
        Current Guess = {currentGuess}
    </div>
  )
}
