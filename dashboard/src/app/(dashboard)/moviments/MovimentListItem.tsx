import { Moviment } from '@/types/Moviment'
import React from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import MovimentListItemEdit from './MovimentListItemEdit'

type Props = {
  moviment: Moviment
  index: number
}

const MovimentListItem = ({moviment, index}: Props) => {
  const [isEditing, setIsEditing] = React.useState(false)

  return (
    <li 
      className='relative flex flex-col gap-3 
      bg-slate-300 bg-opacity-10 border border-stone-400 border-opacity-30  
      p-5 rounded-lg self-start
      focus:border-white'
      tabIndex={index}
    >
      {
        isEditing ? <MovimentListItemEdit moviment={moviment} setIsEditing={setIsEditing} /> : (
          <>
            <p>{moviment.name}</p>
            <p>{moviment.muscle.name}</p>
            <div className="absolute right-0 top-0 py-3 px-5 flex gap-2">
              <button 
                type='button' 
                onClick={() => setIsEditing(true)}
                className='cursor-pointer p-1 hover:scale-110 active:opacity-70'
              ><AiFillEdit size={20} /></button>
              <button 
                type='button' 
                onClick={() => setIsEditing(true)}
                className='cursor-pointer p-1 hover:scale-110 active:opacity-70'
              ><AiFillDelete size={20} /></button>
            </div>
          </>
        )
      }
    </li>
  )
}

export default MovimentListItem