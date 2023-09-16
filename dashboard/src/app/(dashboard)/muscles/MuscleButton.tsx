import React, { PropsWithChildren } from 'react'

type Props = {
  onClick: () => void
}

const MuscleButton = ({onClick, children}: PropsWithChildren<Props>) => {
  return (
    <button 
      onClick={onClick}
      type="button" 
      className="bg-stone-800 text-white px-3 py-1 rounded-md hover:scale-105 active:opacity-80">
      {children}
    </button>
  )
}

export default MuscleButton