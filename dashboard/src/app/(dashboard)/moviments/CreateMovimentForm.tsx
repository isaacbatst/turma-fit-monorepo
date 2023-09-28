'use client'
import React from 'react'
import { useSWRConfig } from 'swr'
import { FormError } from '../../../errors/FormError'
import { useApiGateway } from '../../components/ApiGatewayContext'
import InputCreate from '../../components/InputCreate'
import Loading from '../../components/Loading'
import { CreateMovimentFormErrorHandler } from './CreateMovimentFormErrorHandler'
import MuscleSelect from './MuscleSelect'
import { useSubmitForm } from '../../../hooks/useSubmitForm'

const errorHandler = new CreateMovimentFormErrorHandler()

const CreateMovimentForm = () => {
  const {mutate} = useSWRConfig()
  const apiGateway = useApiGateway()
  const [name, setName] = React.useState('')
  const [selectedMuscle, setSelectedMuscle] = React.useState<string | null>(null)
  const {submit, isSubmitting} = useSubmitForm({
    errorHandler,
    validateAndFetch: async () => {
      if(!name){
        throw new FormError('REQUIRED_NAME')
      }
      if(!selectedMuscle){
        throw new FormError('REQUIRED_MUSCLE_ID')
      }
      await apiGateway.moviments.createMoviment(name, selectedMuscle)
    }
  })

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submit()
    await mutate('moviments')
    setName('')
    setSelectedMuscle(null)
  }
  
  
  return (
    <form tabIndex={0} onSubmit={onSubmit} className="flex flex-col gap-3 border border-stone-600  p-5 rounded-lg lg:self-center">
      <InputCreate inputName='moviment' placeholder='Nome do movimento' setValue={setName} value={name} />
      <MuscleSelect selectedMuscle={selectedMuscle} setSelectedMuscle={setSelectedMuscle} />
      <button className='bg-green-600 rounded-lg py-3 flex justify-center' 
        disabled={isSubmitting}
        type='submit'
      >
        {isSubmitting ? <Loading /> : 'Salvar'}
      </button>
    </form>
  )
}

export default CreateMovimentForm