import React from 'react'

export default function Row({guess, currentGuess, maxLetters, solution}) {

    if (guess) {
        return (
            <div className="row past">
                {guess.map((letter, i) => {
                    if(solution.indexOf(' ') === i) {
                        return <div className='block text-2xl m-1 rounded-xl' key={i}></div>
                    }
                    return <div key={i} className={`${letter.colour} block text-2xl m-1 uppercase font-bold rounded-xl border-b-4 border`}>{letter.key}</div>
                })}
            </div>
        ) 
    }

    if (currentGuess) {
        console.log(`Max letters: ${maxLetters}, Current guess length: ${currentGuess.length}`)
        
        let currentGuessLetters = [...currentGuess.split(''), ...Array(maxLetters - currentGuess.length).fill(' ')]

        return (
            <div className="row current">
                {currentGuessLetters.map((letter, i) => {
                    if(solution.indexOf(' ') === i) {
                        return <div className='block text-2xl m-1 rounded-xl' key={i}></div>
                    }

                    if(letter === " ") {
                        return <div className="block text-2xl m-1 uppercase font-bold rounded-xl border-2" key={i}>{letter}</div>
                    }
                    return <div className="block text-2xl m-1 border-slate-200 filled uppercase font-bold rounded-xl border-b-4 border-2" key={i}>{letter}</div>
                })}
            </div>
        )
    } 

    return (
        <div className="row">
            {Array(maxLetters).fill(' ').map((letter, i) => {
                if(solution.indexOf(' ') === i) {
                    return <div className='block text-2xl m-1 rounded-xl' key={i}></div>
                }
                return <div className='block text-2xl m-1 border-slate-200 uppercase font-bold rounded-xl border-2' key={i}></div>
            })}
        </div>
    )
}
