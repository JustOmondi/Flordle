import React from 'react'
import { useState } from 'react'
import { Dialog, Transition  } from '@headlessui/react'

import GameOver from './modals/GameOver'
import HowToPlay from './modals/HowToPlay'

interface Props {
    isCorrect: boolean,
    infoModalVisible: boolean,
    hideInfoModal: () => void,
    hideMainModal: () => void,
    turn: number,
    solutionName: string,
    resetGame: () => void
}

const Modal: React.FC<Props> = ({isCorrect, infoModalVisible, hideInfoModal, hideMainModal, turn, solutionName, resetGame}) => {

    let [isOpen, setIsOpen] = useState(true)

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async function onDialogClosed (reset: boolean) {
        setIsOpen(false);       

        if (reset) {
            // Add delay otherwise game is reset before dialog disappears
            await delay(700);
            resetGame();
        } else {
            hideInfoModal(); 
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
                    {!infoModalVisible && (
                        <GameOver solutionName={solutionName} isCorrect={isCorrect} turn={turn} onDialogClosed={onDialogClosed}/>
                    )}
                    {infoModalVisible && (
                        <HowToPlay onDialogClosed={onDialogClosed}/>
                    )}
                </div>
            </Dialog>
        </Transition>
    )
}

export default Modal
