import React, { PropsWithChildren } from 'react'

type Props = {
  onClick: () => void
  disabled?: boolean
}

const ItemActionButton = ({onClick, children, disabled = false}: PropsWithChildren<Props>) => {
  return (
    <button 
      onClick={onClick}
      type="button" 
      disabled={disabled}
      className="bg-stone-800 w-20 text-white px-3 py-1 rounded-md 
      flex items-center justify-center
      hover:scale-105 active:opacity-80">
      {children}
    </button>
  )
}

export default ItemActionButton