import React from 'react'
import Row from './Row'

export default function Grid({currentGuess, guesses, turn, maxLetters, solution}) {

  return (
    <div>
        {guesses.map((guess, i) => {
            if(turn === i) {
                return <Row solution={solution} key={i} currentGuess={currentGuess} maxLetters={maxLetters}/>
            }
            return <Row solution={solution} key={i} guess={guess} maxLetters={maxLetters} />
        })}
    </div>
  )
}
