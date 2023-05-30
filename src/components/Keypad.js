import React from 'react';
import { GREY } from '../hooks/useFlordle';

export default function Keypad({ usedKeys, processKeyInput }) {

  const classes = 'select-none pointer-events-auto text-xl uppercase border rounded-xl m-1'

  function handleClick({ target }) {
    processKeyInput(target.dataset.key);
  }

  return (
    <div className='keypad'>
      {usedKeys && Object.entries(usedKeys).map((letter, i) => {
        const color = letter[1].color;
        const letterValue = letter[0];

        if (color === GREY) {
          return <div onClick={handleClick} data-key={letterValue} key={i} className={`${color} ${classes}`}>{letterValue}</div>
        }

        return <div data-key={letterValue} key={i} className={`${color} ${classes}`}>{letterValue}</div>

      })}
    </div>
  )
}
