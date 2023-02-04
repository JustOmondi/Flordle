import React from 'react'

export default function Row({guess, currentGuess, maxLetters}) {

    if (guess) {
        return (
            <div className="row past">
                {guess.map((letter, i) => {
                    return <div key={i} className={letter.colour}>{letter.key}</div>
                })}
            </div>
        ) 
    }

    if (currentGuess) {
        let currentGuessLetters = [...currentGuess.split(''), ...Array(maxLetters - currentGuess.length).fill(' ')]

        return (
            <div className="row current">
                {currentGuessLetters.map((letter, i) => {
                    if (letter === " ") {
                        return <div key={i}>{letter}</div>
                    }
                    return <div className="filled" key={i}>{letter}</div>
                })}
            </div>
        )
    } 

    return (
        <div className="row">
            {Array(maxLetters).fill(' ').map((letter, i) => {
                return <div key={i}></div>
            })}
        </div>
    )
}
