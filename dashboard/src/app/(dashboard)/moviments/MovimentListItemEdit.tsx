import { Moviment } from '@/types/Moviment'
import React from 'react'
import { useSWRConfig } from 'swr'
import { useApiGateway } from '../../components/ApiGatewayContext'
import InputEdit from '../../components/InputEdit'
import Loading from '../../components/Loading'
import { MovimentEditErrorHandler } from './MovimentEditErrorHandler'
import MuscleSelect from './MuscleSelect'
import { useSubmitForm } from '../../../hooks/useSubmitForm'

type Props = {
  moviment: Moviment
  setIsEditing: (value: boolean) => void
}

const errorHandler = new MovimentEditErrorHandler()

const MovimentListItemEdit = ({moviment, setIsEditing}: Props) => {
  const [name, setName] = React.useState(moviment.name)
  const [selectedMuscle, setSelectedMuscle] = React.useState(moviment.muscle.id)
  const apiGateway = useApiGateway()
  const {mutate} = useSWRConfig()
  const {submit, isSubmitting} = useSubmitForm({
    errorHandler,
    validateAndFetch: () => apiGateway.moviments.editMoviment(moviment.id, name, selectedMuscle),
  })

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await submit()
    await mutate('moviments')
    setIsEditing(false)
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