import React from 'react'
import { useState } from 'react'
import { Dialog, Transition  } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/24/outline'

export default function GameOverModal({isCorrect, turn, solution, resetGame}) {

    let [isOpen, setIsOpen] = useState(true)

    function onDialogClosed () {
        setIsOpen(false);
        resetGame();
    }

    return (
        <Transition
            appear
            show={isOpen}
            enter="transition duration-1000 ease-out"
            enterFrom="transform scale-75 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-500 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-75 opacity-0">

            <Dialog as="div" className="relative z-10" onClose={onDialogClosed}>

                {/* Back drop */}
                <div className="fixed inset-0 bg-black/30" />

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <div className="absolute right-4 top-4 rounded-full p-1 hover:text-gray-400 focus:outline-none" onClick={() => setIsOpen(false)}>
                            <XCircleIcon className="h-7 w-7" />
                        </div>
                        {isCorrect && (
                            <React.Fragment>
                                <Dialog.Title className="text-xl bold text-center pb-3 font-medium leading-6">You win!</Dialog.Title>
                                <div className="mt-2 text-center">
                                <p>The solution was <span className='text-green-700 bold'>{solution}</span></p>
                                <p className='text-gray-500 mt-3'>You found the solution in <span className='bold'>{turn}</span> guesses</p>
                                </div>
                            </React.Fragment>  
                        )}
                        {!isCorrect && (
                            <React.Fragment>
                                <Dialog.Title className="text-xl bold text-center pb-3 font-medium leading-6">Try again</Dialog.Title>
                                <div className="mt-2 text-center">
                                    <p>The solution was <span className='text-green-700 bold'>{solution}</span></p>
                                    <p className='text-gray-500 mt-3'>Better luck next time!</p>
                                </div>
                            </React.Fragment>  
                        )}
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition>
    )
}
