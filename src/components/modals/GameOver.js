import React from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { Dialog  } from '@headlessui/react'

export default function GameOver({solutionName, isCorrect, turn, onDialogClosed}) {
  return (
    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
        <div className="absolute right-4 top-4 rounded-full p-1 hover:text-gray-400 focus:outline-none" onClick={() => onDialogClosed(true)}>
            <XCircleIcon className="h-7 w-7" />
        </div>
        {isCorrect && (
            <React.Fragment>
                <Dialog.Title className="text-xl bold text-center pb-3 font-medium leading-6">You win!</Dialog.Title>
                <div className="mt-2 text-center">
                <p>The solution was <span className='text-green-700 bold'>{solutionName}</span></p>
                <p className='text-gray-500 mt-3'>You found the solution in <span className='bold'>{turn}</span> guesses</p>
                </div>
            </React.Fragment>  
        )}
        {!isCorrect && (
            <React.Fragment>
                <Dialog.Title className="text-xl bold text-center pb-3 font-medium leading-6">Try again</Dialog.Title>
                <div className="mt-2 text-center">
                    <p>The solution was <span className='text-green-700 bold'>{solutionName}</span></p>
                    <p className='text-gray-500 mt-3'>Better luck next time!</p>
                </div>
            </React.Fragment>  
        )}
    </Dialog.Panel>
  )
}