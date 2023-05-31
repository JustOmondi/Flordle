import { Dialog } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

interface Props {
  onDialogClosed: (reset: boolean) => void,
}

const HowToPlayModal: React.FC<Props> = ({ onDialogClosed }) => {
  const buttonClasses: string = 'block uppercase text-base lg:text-2xl m-1 w-10 h-8 lg:h-11 leading-relaxed lg:leading-10 font-bold rounded-xl border-b-4 border'

  return (
    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
      <div className="absolute right-4 top-4 rounded-full p-1 hover:text-gray-400 focus:outline-none" onClick={() => onDialogClosed(false)}>
        <XCircleIcon className="h-7 w-7" />
      </div>
      <React.Fragment>
        <Dialog.Title className="text-xl bold text-center pb-3 font-bold leading-6">How to play</Dialog.Title>
        <div className="mt-2 text-center">
          <p>Guess the name of the country that the flag shown belongs to in 5 guesses.<br></br>After each guess,
            the colour of the tiles will change depending on how close your guess was to the answer.
          </p>
          <p className='text-gray-500 mt-3 mb-2 '>Example answer: JAPAN</p>
          <div className="row">
            <div className={`green ${buttonClasses}`}>j</div>
            <div className={`green ${buttonClasses}`}>a</div>
            <div className={`green ${buttonClasses}`}>p</div>
            <div className={`yellow ${buttonClasses}`}>n</div>
            <div className={`gray ${buttonClasses}`}>o</div>
          </div>
          <p className='text-gray-500 mt-3'>The letters <span className='text-black bold'>J A P</span> are in the answer and in the correct position</p>
          <p className='text-gray-500 mt-3'>The letter <span className='text-black bold'>N</span> is in the answer but not in the correct position</p>
          <p className='text-gray-500 mt-3'>The letter <span className='text-black bold'>O</span> is not in the answer</p>
        </div>
      </React.Fragment>
    </Dialog.Panel>
  )
}

export default HowToPlayModal