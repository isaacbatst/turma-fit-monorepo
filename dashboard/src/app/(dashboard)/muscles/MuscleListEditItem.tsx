import React from 'react'
import { Muscle } from '../../../types/Muscle'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { useSWRConfig } from 'swr'
import Loading from '../../components/Loading'
import { toast } from 'react-toastify'

type Props = {
  muscle: Muscle,
  finishEdit(): void
}

const editMuscleErrors: Record<string, string> = {
  'NAME_ALREADY_EXISTS': 'Já existe um músculo com esse nome',
  'REQUIRED_NAME': 'O nome é obrigatório',
  'NOT_FOUND': 'Músculo não encontrado',
}

const MuscleListEditItem = ({muscle, finishEdit}: Props) => {
  const {mutate} = useSWRConfig()
  const [name, setName] = React.useState(muscle.name)
  const [isLoading, setIsLoading] = React.useState(false)

  const submitEdit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const response = await fetch(`http://localhost:5555/muscles/${muscle.id}`, {
        body: JSON.stringify({
          name
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        credentials: 'include',
      })

      if(response.status === 204) {
        await mutate('muscles')
        finishEdit()
        return
      }
      const data = await response.json();
      const error = editMuscleErrors[data.message]
      toast.error(error, {
        theme: 'dark',
        position: 'bottom-right',
        autoClose: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  } 

  return (
    <li
      className="flex flex-1 min-h-[56px] justify-between text-lg text-stone-900 rounded-2xl" 
      key={muscle.id}>
      <form onSubmit={submitEdit} className='flex flex-1 gap-2'>
        <input className='rounded-2xl px-3 flex-1 bg-white ' type="text" name="edit-muscle" 
          value={name}
          onChange={(e) => setName(e.target.value)} 
        />
        <div className='flex gap-2'>
          <button className='bg-green-600 px-5 text-white rounded-2xl'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? <Loading color='white' /> : <AiOutlineCheck />}
          </button>
          <button className='bg-red-600 px-5 text-white rounded-2xl' 
            onClick={finishEdit}><AiOutlineClose /></button>
        </div>
      </form>
    </li>
  )
}

export default MuscleListEditItem