'use client'
import { Collapse, CollapseProps } from 'antd'
import { useSWRConfig } from 'swr'
import { useSubmitForm } from '../../../hooks/useSubmitForm'
import { useTrainings } from '../../../hooks/useTrainings'
import { useApiGateway } from '../../components/ApiGatewayContext'
import Loading from '../../components/Loading'
import { CreateMovimentFormErrorHandler } from '../moviments/CreateMovimentFormErrorHandler'
import TrainingItem from './TrainingItem'

const errorHandler = new CreateMovimentFormErrorHandler()

const TrainingsList = () => {
  const {trainings, isLoading} = useTrainings()
  const {mutate} = useSWRConfig()
  const apiGateway = useApiGateway()
  const {isSubmitting, submit} = useSubmitForm({
    errorHandler,
    validateAndFetch: () => apiGateway.training.createTraining(),
  })

  const onCreateTraining = async () => {
    await submit()
    await mutate('trainings')
  }

  const collapseItems: CollapseProps['items'] = trainings?.map((training) => {
    const createdAt = new Date(training.createdAt)
    const date = createdAt.toLocaleDateString('pt-BR')
    const time = createdAt.toLocaleTimeString('pt-BR')
    const muscles = training.muscles.length === 0 ? '' :
      `(${training.muscles.map(muscle => muscle.name).join(', ')})`

    return ({
      children: <TrainingItem training={training} />,
      label: `Treino criado em ${date} às ${time} ${muscles}`
    })
  })

  const createButtonText = trainings?.length === 0 ? 'Criar primeiro treino' : 'Criar novo treino'

  return (
    <div className='flex items-center flex-col gap-6'>
      {
        trainings?.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center">
            <p className='font-light mb-6'>Nenhum treino encontrado.</p>
          </div>
        )
      }
      <button 
        type='button'
        onClick={onCreateTraining}
        disabled={isSubmitting}
        className='px-5 py-2
            flex justify-center items-center
            w-48  h-12
            rounded-lg bg-amber-500 hover:scale-105 active:opacity-80'>
        {isSubmitting  ? <Loading color='white' /> : createButtonText}
      </button>
      {isLoading && (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}
      {trainings && trainings?.length > 0 && (
        <Collapse 
          accordion 
          style={{alignSelf: 'stretch'}}
          items={collapseItems} 
        />
      )}
    </div>
  )
}

export default TrainingsList