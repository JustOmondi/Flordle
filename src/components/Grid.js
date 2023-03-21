import React from 'react'
import Row from './Row'

export default function Grid({currentGuess, guesses, turn, maxLetters, solutionName}) {

  return (
    <div>
        {guesses.map((guess, i) => {
            if(turn === i) {
                return <Row solutionName={solutionName} key={i} currentGuess={currentGuess} maxLetters={maxLetters}/>
            }
            return <Row solutionName={solutionName} key={i} guess={guess} maxLetters={maxLetters} />
        })}
    </div>
  )
}
