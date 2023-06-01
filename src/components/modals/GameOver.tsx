import { Dialog } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

interface Props {
    onDialogClosed: (reset: boolean) => void,
    turn: number,
    isCorrect: boolean,
    solutionName: string
}
   
const GameOver: React.FC<Props> = ({ solutionName, isCorrect, turn, onDialogClosed }) => {
    return (
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <div className="absolute right-4 top-4 rounded-full p-1 hover:text-gray-400 focus:outline-none" onClick={() => onDialogClosed(true)}>
                <XCircleIcon className="h-7 w-7" />
            </div>
            {isCorrect && (
                <React.Fragment>
                    <Dialog.Title className="text-xl bold text-center pb-3 font-bold leading-6">You win!</Dialog.Title>
                    <div className="mt-2 text-center">
                        <p>The solution was <span className='text-green-700 font-bold'>{solutionName}</span></p>
                        <p className='text-gray-500 mt-3'>You found the solution in <span className='bold'>{turn}</span>{(turn > 1) ? ' guesses' : ' guess'}</p>
                        <button onClick={() => onDialogClosed(true)} className='text-center mt-5 bg-gray-300 hover:bg-white p-3 border border-gray-500 border-t-4 rounded-lg'>Try another one</button>
                    </div>

                </React.Fragment>
            )}
            {!isCorrect && (
                <React.Fragment>
                    <Dialog.Title className="text-xl bold text-center pb-3 font-bold leading-6">Try again</Dialog.Title>
                    <div className="mt-2 text-center">
                        <p>The solution was <span className='text-green-700 font-bold'>{solutionName}</span></p>
                        <p className='text-gray-500 mt-3'>Better luck next time!</p>
                    </div>
                </React.Fragment>
            )}
        </Dialog.Panel>
    )
}

export default GameOver
