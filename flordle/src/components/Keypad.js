import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Keypad({usedKeys}) {
  const [letters, setLetters] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/letters')
    .then((res) => res.json())
    .then((letters) => setLetters(letters))
  }, [])


  return (
    <div className='keypad'>
        {letters && letters.map((letter, i) => { 
            const color = usedKeys[letter.key]
            return <div key={i} className={color}>{letter.key}</div>
        })}
    </div>
  )
}
