import { Moviment } from '@/types/Moviment'
import React from 'react'
import InputEdit from '../../components/InputEdit'
import Loading from '../../components/Loading'
import MuscleSelect from './MuscleSelect'

type Props = {
  moviment: Moviment
  setIsEditing: (value: boolean) => void
}

const MovimentListItemEdit = ({moviment, setIsEditing}: Props) => {
  const [name, setName] = React.useState(moviment.name)
  const [selectedMuscle, setSelectedMuscle] = React.useState(moviment.muscle.id)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  return (
    <>
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
    </>
  )
}

export default MovimentListItemEdit