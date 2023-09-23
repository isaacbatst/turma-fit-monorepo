import { Moviment } from '@/types/Moviment'
import React from 'react'
import InputEdit from '../../components/InputEdit'
import Loading from '../../components/Loading'
import MuscleSelect from './MuscleSelect'
import { useSWRConfig } from 'swr'
import { MovimentEditErrorHandler } from './MovimentEditErrorHandler'
import { ResponseError } from '../../../errors/ResponseError'

type Props = {
  moviment: Moviment
  setIsEditing: (value: boolean) => void
}

const errorHandler = new MovimentEditErrorHandler()

const MovimentListItemEdit = ({moviment, setIsEditing}: Props) => {
  const [name, setName] = React.useState(moviment.name)
  const [selectedMuscle, setSelectedMuscle] = React.useState(moviment.muscle.id)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const {mutate} = useSWRConfig()

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      setIsSubmitting(true)
      const response = await fetch(`http://localhost:5555/moviments/${moviment.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, muscleId: selectedMuscle}),
      })

      if(response.status !== 204){
        const data = await response.json()
        throw new ResponseError(data.message, response.status)
      }

      await mutate('moviments')
      setIsEditing(false)
    } catch (error) {
      const message = errorHandler.getMessage(error)
      errorHandler.showToast(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className='flex flex-col gap-3' onSubmit={onSubmit}>
      <InputEdit 
        cancelEdit={() => setIsEditing(false)} 
        inputName='moviment'
        setValue={(value) => setName(value)}
        value={name}
      />
      <MuscleSelect selectedMuscle={selectedMuscle} setSelectedMuscle={setSelectedMuscle} />
      <button className='bg-green-600 rounded-lg py-2 flex justify-center' 
        disabled={isSubmitting}
        type='submit'
      >
        {isSubmitting ? <Loading /> : 'Salvar'}
      </button>
      <button className='bg-red-600 rounded-lg py-2 flex justify-center' 
        type='submit' onClick={() => setIsEditing(false)}
      >Voltar
      </button>
    </form>
  )
}

export default MovimentListItemEdit