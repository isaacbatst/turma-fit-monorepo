import { Moviment } from '@/types/Moviment'
import React from 'react'
import { useSWRConfig } from 'swr'
import { ErrorHandler } from '../../../errors/ErrorHandler'
import { ResponseError } from '../../../errors/ResponseError'
import MovimentListItemEdit from './MovimentListItemEdit'
import MovimentListItemView from './MovimentListItemView'

type Props = {
  moviment: Moviment
  index: number
}

const MovimentListItem = ({moviment, index}: Props) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const {mutate} = useSWRConfig()

  const deleteMoviment = async () => {
    try {
      setIsDeleting(true)
      const response = await fetch(`http://localhost:5555/moviments/${moviment.id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      
      if(response.status !== 204){
        const data = await response.json()
        throw new ResponseError(data.message, response.status)
      }

      await mutate('moviments')
    } catch (error) {
      console.log(error)
      const message = error instanceof ResponseError && error.status === 404
        ? 'Movimento não encontrado'
        : 'Erro ao excluir movimento'

      ErrorHandler.showToast(message)
    } finally {
      setIsDeleting(false)
    }
  }
    

  return (
    <li 
      className='relative flex flex-col gap-3 
      bg-slate-300 bg-opacity-10 border border-stone-400 border-opacity-30  
      p-5 rounded-lg self-start
      focus:border-white'
      tabIndex={index}
    >
      {
        isEditing 
          ? <MovimentListItemEdit moviment={moviment} setIsEditing={setIsEditing} /> 
          : (
            <MovimentListItemView  
              moviment={moviment}
              isDeleting={isDeleting}
              deleteMoviment={deleteMoviment}
              startEdit={() => setIsEditing(true)}
            />
          )
      }
    </li>
  )
}

export default MovimentListItem