'use client'
import { useSWRConfig } from 'swr'
import { useTrainings } from '../../../hooks/useTrainings'
import Loading from '../../components/Loading'
import { CreateMovimentFormErrorHandler } from '../moviments/CreateMovimentFormErrorHandler'
import { useState } from 'react'
import { sleep } from '../../../lib/sleep'
import { Collapse, CollapseProps } from 'antd'
import TrainingItem from './TrainingItem'

const errorHandler = new CreateMovimentFormErrorHandler()

const TrainingsList = () => {
  const {trainings, isLoading} = useTrainings()
  const [isCreating, setIsCreating] = useState(false)
  const {mutate} = useSWRConfig()
  
  const onCreateTraining = async () => {
    try {
      setIsCreating(true)
      const response = await fetch('http://localhost:5555/trainings', {
        method: 'POST',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Não foi possível criar o treino.')
      }
      await sleep(1000)
      await mutate('trainings')
    } catch (error) {
      const message = errorHandler.getMessage(error)
      errorHandler.showToast(message)
    } finally {
      setIsCreating(false)
    }
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
        disabled={isCreating}
        className='px-5 py-2
            flex justify-center items-center
            w-48  h-12
            rounded-lg bg-amber-500 hover:scale-105 active:opacity-80'>
        {isCreating  ? <Loading color='white' /> : createButtonText}
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