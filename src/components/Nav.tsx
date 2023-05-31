import { ArrowPathIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

interface Props {
  showInfoModal: () => void,
  resetGame: () => void,
  flagCode: string,
}

const Nav: React.FC<Props> = ({ showInfoModal, resetGame, flagCode }) => {
  return (
    <header className="bg-white border-b-2 border-grey-300 mb-2">
      <nav className="mx-auto flex w-full md:w-1/2 lg:w-1/4 justify-between p-2 lg:px-4" aria-label="Global">
        <div className="flex lg:flex-1 z-10">
          <img src="logo.png" alt='logo' className='w-8 h-8 mr-3' />
          <p className="">Flordle</p>
        </div>
        <div className='flex  z-10'>
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

export default Nav