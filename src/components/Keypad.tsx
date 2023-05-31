import React from 'react';
import { GREEN, GREY, YELLOW } from '../hooks/useFlordle';

interface Props {
  usedKeys: {[letter: string]: {value: string, colour: string}},
  processKeyInput: (key: string) => void,
}

const Keypad: React.FC<Props> = ({ usedKeys, processKeyInput }) => {

  const classes: string = 'select-none pointer-events-auto text-xl font-bold uppercase border-t-4 border rounded-xl m-1 px-3 md:px-7 leading-10 shadow-lg'

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    let key: string = event.currentTarget.getAttribute('data-key') as string

    processKeyInput(key);
  }

  return (
    <div className='keypad px-4'>
      {usedKeys && Object.entries(usedKeys).map((letter, i) => {
        const colour: string = letter[1].colour
        const letterValue: string = letter[0]

        if ([GREY, YELLOW, GREEN].includes(colour)) {
          return <div onClick={handleClick} data-key={letterValue} key={i} className={`${colour} ${classes} clickable`}>{letterValue}</div>
        }

        return <div data-key={letterValue} key={i} className={`${colour} ${classes}`}>{letterValue}</div>

      })}
    </div>
  )
}

export default Keypad