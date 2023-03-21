import React from 'react'
import { useState } from 'react'
import { Dialog, Transition  } from '@headlessui/react'

import GameOver from './modals/GameOver'
import HowToPlay from './modals/HowToPlay'

export default function GameOverModal({isCorrect, maxTurnsReached, turn, solution, resetGame, hideModal}) {

    let [isOpen, setIsOpen] = useState(true)

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async function onDialogClosed (reset) {
        setIsOpen(false);
        hideModal()
        
        if (reset) {
            // Add delay otherwise game is reset before dialog disappears
            await delay(700);
            resetGame();
        }  
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

            <Dialog as="div" className="relative z-10" onClose={() => {return}}>

                {/* Back drop */}
                <div className="fixed inset-0 bg-black/30" />

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    {maxTurnsReached && (
                        <GameOver solution={solution} isCorrect={isCorrect} turn={turn} onDialogClosed={onDialogClosed}/>
                    )}
                    {!maxTurnsReached && (
                        <HowToPlay onDialogClosed={onDialogClosed}/>
                    )}
                </div>
            </Dialog>
        </Transition>
    )
}
