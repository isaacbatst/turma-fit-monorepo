import { AiFillDelete } from 'react-icons/ai'
import { ExerciseSet } from '../../../types/Training'
import { useApiGateway } from '../../components/ApiGatewayContext'
import { useSWRConfig } from 'swr'
import { useSubmitForm } from '../../../hooks/useSubmitForm'
import { ErrorHandler } from '../../../errors/ErrorHandler'

type Props = {
  exerciseSet: ExerciseSet
  trainingId: string
}

class RemoveExerciseSetErrorHandler extends ErrorHandler {
  protected formErrorMessages: Record<string, string> = {}
  protected responseErrorMessages: Record<number, (error: string) => string | undefined> = {
    404: (error) => {
      const errors: Record<string, string> = {
        TRAINING_NOT_FOUND: 'Treino não encontrado.',
        EXERCISE_SET_NOT_FOUND: 'Exercício não encontrado.'
      }

      return errors[error]
    }
  }
}

const ExerciseSetItem = ({exerciseSet, trainingId}: Props) => {
  const apiGateway = useApiGateway()
  const {submit} = useSubmitForm({
    validateAndFetch: () => apiGateway.training.removeExerciseSet(trainingId, exerciseSet.id),
    errorHandler: new RemoveExerciseSetErrorHandler()
  })
  const {mutate} = useSWRConfig()
  const removeExerciseSet = async () => {
    await submit()
    await mutate('trainings')
  }
  
  return (
    <li className='flex flex-1 items-center justify-between gap-2 
    bg-slate-900 bg-opacity-40 p-2 border border-slate-700 rounded-lg'>
      <p>{exerciseSet.name}</p>
      <div className='flex gap-3 items-center'>
        <p>{exerciseSet.sets}x{exerciseSet.repetitions}</p>
        <button className='p-1 active:opacity-70' type='button' onClick={removeExerciseSet}>
          <AiFillDelete size={24} />
        </button>
      </div>
    </li>
  )
}

export default ExerciseSetItem