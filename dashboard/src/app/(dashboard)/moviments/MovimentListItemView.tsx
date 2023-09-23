import React from 'react'
import { Moviment } from '@/types/Moviment'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'

type Props = {
  moviment: Moviment
  isDeleting: boolean
  startEdit: () => void
  deleteMoviment: () => void
}

const MovimentListItemView = ({moviment, startEdit, deleteMoviment, isDeleting}: Props) => {
  return (
    <>
      <p>{moviment.name}</p>
      <p>{moviment.muscle.name}</p>
      <div className="absolute right-0 top-0 py-3 px-5 flex gap-2">
        <button 
          type='button' 
          onClick={startEdit}
          className='cursor-pointer p-1 hover:scale-110 active:opacity-70'
        ><AiFillEdit size={20} /></button>
        <button 
          type='button' 
          onClick={deleteMoviment}
          disabled={isDeleting}
          className='cursor-pointer p-1 hover:scale-110 active:opacity-70'
        ><AiFillDelete size={20} /></button>
      </div>
    </>
  )
}

export default MovimentListItemView