import React from 'react'
import { keypadLetters } from '../data/gameData'

export default function Keypad({usedKeys}) {

  return (
    <div className='keypad'>
        {keypadLetters && keypadLetters.map((letter, i) => { 
            const color = usedKeys[letter.key]
            return <div key={i} className={color}>{letter.key}</div>
        })}
    </div>
  )
}
