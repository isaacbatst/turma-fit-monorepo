import React from 'react'
import { useSWRConfig } from 'swr'
import { ErrorHandler } from '../../../errors/ErrorHandler'
import { useSubmitForm } from '../../../hooks/useSubmitForm'
import { Muscle } from '../../../types/Muscle'
import { useApiGateway } from '../../components/ApiGatewayContext'
import EditButtons from '../../components/EditButtons'
import InputEdit from '../../components/InputEdit'

type Props = {
  muscle: Muscle,
  finishEdit(): void
}

class EditMuscleErrorHandler extends ErrorHandler {
  protected formErrorMessages: Record<string, string> = {
    'DUPLICATED_NAME': 'Já existe um músculo com esse nome',
    'REQUIRED_NAME': 'O nome é obrigatório',
  }
  protected responseErrorMessages: Record<number, (error: string) => string | undefined> = {
    404: () => 'Músculo não encontrado',
    409: () => 'Já existe um músculo com esse nome',
  }
}

const MuscleListEditItem = ({muscle, finishEdit}: Props) => {
  const {mutate} = useSWRConfig()
  const [name, setName] = React.useState(muscle.name)
  const apiGateway = useApiGateway()

  const {isSubmitting, submit} = useSubmitForm({
    validateAndFetch: () => apiGateway.muscles.editMuscle(muscle.id, name),
    errorHandler: new EditMuscleErrorHandler()
  })

  const submitEdit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await submit()
    await mutate('muscles')
    finishEdit()
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
          isLoading={isSubmitting}
        />
      </form>
    </li>
  )
}

export default MuscleListEditItem