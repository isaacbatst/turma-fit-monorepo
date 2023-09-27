'use client'; 
import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { useSWRConfig } from 'swr';
import { useApiGateway } from '../../components/ApiGatewayContext';
import InputCreate from '../../components/InputCreate';
import Loading from '../../components/Loading';
import { CreateMuscleErrorHandler } from './CreateMuscleErrorHandler';
import { useSubmitForm } from '../../../hooks/useSubmitForm';

const errorHandler = new CreateMuscleErrorHandler()

const CreateMuscleForm: React.FC = () => {
  const [name, setName] = React.useState('')
  const {mutate} = useSWRConfig()
  const apiGateway = useApiGateway()
  const {submit, isSubmitting} = useSubmitForm({
    errorHandler,
    validateAndFetch: () => apiGateway.muscles.createMuscle(name),
  })

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submit()
    setName('')
    await mutate('muscles')
  }

  return  <li className='flex'>
    <form className="flex flex-1 gap-3"
      onSubmit={onSubmit}
    >
      <InputCreate  
        inputName='muscle'
        placeholder='Adicionar músculo'
        setValue={setName}
        value={name}
      />
      <button type="submit" title="Salvar" className="bg-amber-500 text-white px-6 py-3 rounded-lg">
        {
          isSubmitting ? <Loading /> : <AiOutlineCheck size={24} />
        }
      </button>
    </form>
  </li>
}

export default CreateMuscleForm