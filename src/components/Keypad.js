import React from 'react'
import { keypadLetters } from '../data/gameData'

export default function Keypad({usedKeys}) {

  return (
    <div className='keypad'>
        {keypadLetters && keypadLetters.map((letter, i) => { 
            const color = usedKeys[letter.key]
            if (letter === " ") {
              return <div key={i} className={`${color} text-xl uppercase border rounded-xl m-1`}>Space</div>
            }
            return <div key={i} className={`${color} text-xl uppercase border rounded-xl m-1`}>{letter.key}</div>
        })}
    </div>
  )
}
