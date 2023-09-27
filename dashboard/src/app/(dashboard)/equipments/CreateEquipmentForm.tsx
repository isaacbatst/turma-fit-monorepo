'use client'; 
import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { useSWRConfig } from 'swr';
import { useSubmitForm } from '../../../hooks/useSubmitForm';
import { useApiGateway } from '../../components/ApiGatewayContext';
import InputCreate from '../../components/InputCreate';
import Loading from '../../components/Loading';
import { CreateEquipmentErrorHandler } from './CreateEquipmentErrorHandler';

const errorHandler = new CreateEquipmentErrorHandler()

const CreateEquipmentForm: React.FC = () => {
  const [name, setName] = React.useState('')
  const apiGateway = useApiGateway()
  const {mutate} = useSWRConfig()
  const {isSubmitting, submit} = useSubmitForm({
    validateAndFetch: () => apiGateway.equipments.createEquipment(name),
    errorHandler
  })

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submit()
    await mutate('equipments')
    setName('')
  }

  return  <li className='flex'>
    <form className="flex flex-1 gap-3"
      onSubmit={onSubmit}
    >
      <InputCreate  
        inputName='equipment'
        placeholder='Adicionar equipamento'
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

export default CreateEquipmentForm