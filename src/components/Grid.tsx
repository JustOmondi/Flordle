import React from 'react'
import Row from './Row'

interface Props {
  currentGuess: string,
  guesses: {key: string, colour: string}[][],
  turn: number,
  maxLetters: number,
  solutionName: string
}

const Grid: React.FC<Props> = ({currentGuess, guesses, turn, maxLetters, solutionName}) => {

  return (
    <div>
        {guesses.map((guess: {key: string, colour: string}[], i: number) => {
            if(turn === i) {
                return <Row solutionName={solutionName} key={i} currentGuess={currentGuess} maxLetters={maxLetters}/>
            }
            return <Row solutionName={solutionName} key={i} guess={guess} maxLetters={maxLetters} />
        })}
    </div>
  )
}

export default Grid
