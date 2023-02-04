import React from 'react'
import Row from './Row'

export default function Grid({currentGuess, guesses, turn, maxLetters}) {

  return (
    <div>
        {guesses.map((guess, i) => {
            if(turn === i) {
                return <Row key={i} currentGuess={currentGuess} maxLetters={maxLetters}/>
            }
            return <Row key={i} guess={guess} maxLetters={maxLetters} />
        })}
    </div>
  )
}
