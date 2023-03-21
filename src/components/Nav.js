import React from 'react'
import { InformationCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

export default function Nav({showInfoModal, resetGame, solutionName}) {
  return (
    <header className="bg-white border-b-2 border-grey-300 mb-2">
        <nav className="mx-auto flex w-1/4 justify-between p-2 lg:px-4" aria-label="Global">
            <div className="flex lg:flex-1">
                <a href="/" className="-m-1.5 p-1.5">
                <p className="">Flordle: {solutionName}</p>
                </a>
            </div>
            <div className='flex'>
                <div onClick={showInfoModal} className="pointer-events-auto rounded-full p-1 text-gray-400 hover:text-black focus:outline-none">
                <span className="sr-only">Info</span>
                <InformationCircleIcon className="h-6 w-6 mr-3" />
                </div>
                <div onClick={resetGame} className="pointer-events-auto rounded-full p-1 text-gray-400 hover:text-black focus:outline-none">
                <span className="sr-only">Reset</span>
                <ArrowPathIcon className="h-6 w-6" />
                </div>
            </div>
        </nav>
    </header>
  )
}
