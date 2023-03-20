import React from 'react'

export default function Keypad({usedKeys}) {

  return (
    <div className='keypad'>
        {usedKeys && Object.entries(usedKeys).map((letter, i) => { 
            const color = letter[1].color;
            const letterValue = letter[0];

            if (letterValue === "_") {
              return <div key={i} className={`${color} text-xl uppercase border rounded-xl m-1`}>Space</div>
            }
            return <div key={i} className={`${color} text-xl uppercase border rounded-xl m-1`}>{letterValue}</div>
        })}
    </div>
  )
}
