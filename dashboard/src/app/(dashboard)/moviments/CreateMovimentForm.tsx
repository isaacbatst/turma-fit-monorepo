'use client'
import React from 'react'
import { useSWRConfig } from 'swr'
import { FormError } from '../../../errors/FormError'
import { ResponseError } from '../../../errors/ResponseError'
import InputCreate from '../../components/InputCreate'
import Loading from '../../components/Loading'
import { CreateMovimentFormErrorHandler } from './CreateMovimentFormErrorHandler'
import MuscleSelect from './MuscleSelect'

const postMoviment = async (name: string, muscleId: string) => {
  return fetch('http://localhost:5555/moviments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, muscleId }),
    credentials: 'include',
  });
}

const errorHandler = new CreateMovimentFormErrorHandler()

const CreateMovimentForm = () => {
  const {mutate} = useSWRConfig()
  const [name, setName] = React.useState('')
  const [selectedMuscle, setSelectedMuscle] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if(!name){
        throw new FormError('REQUIRED_NAME')
      }
      if(!selectedMuscle){
        throw new FormError('REQUIRED_MUSCLE_ID')
      }
      setIsSubmitting(true)
      const response = await postMoviment(name, selectedMuscle)
      const data = await response.json()
      if(response.status !== 201) {
        throw new ResponseError(data.message, response.status)
      }
  
      setName('')
      setSelectedMuscle(null)
      await mutate('moviments')
    } catch(err) {
      const error = errorHandler.getMessage(err)
      errorHandler.showToast(error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  
  return (
    <form tabIndex={0} onSubmit={onSubmit} className="flex flex-col gap-3 border border-stone-600  p-5 rounded-lg self-center min-w-[300px]">
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