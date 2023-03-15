import React from 'react'
import { useState, Fragment } from 'react'
import { Dialog, Transition  } from '@headlessui/react'

export default function GameOverModal({isCorrect, turn, solution}) {

    let [isOpen, setIsOpen] = useState(true)

    function onDialogClosed () {
        setIsOpen(false);
    }

    return (
        <Transition
            appear
            show={isOpen}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            as={Fragment}>

            <Dialog as="div" className="relative z-10" onClose={onDialogClosed}>

                {/* Back drop */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Description>
                            Sample Description
                        </Dialog.Description>
                        {isCorrect && (
                            <React.Fragment>
                                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">You win!</Dialog.Title>
                                <div className="mt-2">
                                    <p className='solution'>The solution is: {solution}</p>
                                    <p>You found the solution in {turn} guesses</p>
                                </div>
                            </React.Fragment>  
                        )}
                        {!isCorrect && (
                            <React.Fragment>
                                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">Try again</Dialog.Title>
                                <div className="mt-2">
                                    <p className='solution'>The solution is: {solution}</p>
                                    <p>You found the solution in {turn} guesses</p>
                                </div>
                            </React.Fragment>  
                        )}
                        <button onClick={() => setIsOpen(false)}>Close</button>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition>
    )
}
