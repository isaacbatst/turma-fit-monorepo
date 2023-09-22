import React from 'react'
import { toast } from 'react-toastify'
import { useSWRConfig } from 'swr'
import { Muscle } from '../../../types/Muscle'
import EditButtons from '../../components/EditButtons'
import InputEdit from '../../components/InputEdit'

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
        <InputEdit  
          inputName='name'
          setValue={setName}
          value={name}
          cancelEdit={finishEdit}
        />
        <EditButtons 
          finishEdit={finishEdit}
          isLoading={isLoading}
        />
      </form>
    </li>
  )
}

export default MuscleListEditItem