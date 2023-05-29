import React from 'react'

export default function Row({ guess, currentGuess, maxLetters, solutionName }) {
    const classes = 'block text-base lg:text-2xl m-1 rounded-xl uppercase font-bold w-10 h-8 lg:h-11 leading-relaxed lg:leading-10'

    if (guess) {
        return (
            <div className="row past">
                {guess.map((letter, i) => {
                    if (solutionName.indexOf(' ') === i) {
                        return <div className={classes} key={i}></div>
                    }
                    return <div key={i} className={`${letter.colour} ${classes} border-b-4 border`}>{letter.key}</div>
                })}
            </div>
        )
    }

    if (currentGuess) {

        let currentGuessLetters = [...currentGuess.split(''), ...Array(maxLetters - currentGuess.length).fill(' ')]

        return (
            <div className="row current">
                {currentGuessLetters.map((letter, i) => {
                    if (solutionName.indexOf(' ') === i) {
                        return <div className={classes} key={i}></div>
                    }

                    if (letter === " ") {
                        return <div className={`${classes} border-2`} key={i}>{letter}</div>
                    }
                    return <div className={`${classes} border-slate-200 filled border-b-4 border-2`} key={i}>{letter}</div>
                })}
            </div>
        )
    }

    return (
        <div className="row">
            {Array(maxLetters).fill(' ').map((letter, i) => {
                if (solutionName.indexOf(' ') === i) {
                    return <div className={classes} key={i}></div>
                }
                return <div className={`${classes} border-slate-200 border-2`} key={i}></div>
            })}
        </div>
    )
}
