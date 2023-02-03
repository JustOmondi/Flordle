import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Keypad() {
const [letters, setLetters] = useState(null)

useEffect(() => {
  fetch('http://localhost:3001/letters')
  .then((res) => res.json())
  .then((letters) => setLetters(letters))

}, [])


  return (
    <div className='keypad'>
        {letters && letters.map((letter, i) => { 
            return <div key={i}>{letter.key}</div>
        })}
    </div>
  )
}
