'use client'; 
import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { useSWRConfig } from 'swr';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';
import InputCreate from '../../components/InputCreate';

const postMuscle = async (name: string) => {
  return fetch('http://localhost:5555/muscles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
    credentials: 'include',
  });

}

const postMuscleErrors: Record<number, string> = {
  409: 'Músculo já cadastrado',
  400: 'Nome inválido',
}

const CreateMuscleForm: React.FC = () => {
  const [name, setName] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const {mutate} = useSWRConfig()

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      setIsLoading(true)
      const response = await postMuscle(name)

      if(response.status === 201){
        setName('')
        await mutate('muscles')
        return
      }

      const error = postMuscleErrors[response.status] || 'Erro desconhecido'
      toast.error(error, {
        theme: 'dark',
        position: 'bottom-right',
        autoClose: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return  <li className='flex'>
    <form className="flex flex-1 gap-3"
      onSubmit={onSubmit}
    >
      <InputCreate  
        inputName='name'
        placeholder='Adicionar músculo'
        setValue={setName}
        value={name}
      />
      <button type="submit" title="Salvar" className="bg-amber-500 text-white px-6 py-3 rounded-lg">
        {
          isLoading ? <Loading /> : <AiOutlineCheck size={24} />
        }
      </button>
    </form>
  </li>
}

export default CreateMuscleForm