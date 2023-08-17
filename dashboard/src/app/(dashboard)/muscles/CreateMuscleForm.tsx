'use client'; 
import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { useSWRConfig } from 'swr';

const postMuscle = async (name: string) => {
  await fetch('/api/muscles', {
    method: 'POST',
    body: JSON.stringify({ name })
  });

}

const CreateMuscleForm = () => {
  const [name, setName] = React.useState('')
  const {mutate} = useSWRConfig()

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await postMuscle(name)
    setName('')
    await mutate('muscles')
  }

  return  <form className="flex gap-3"
    onSubmit={onSubmit}
  >
    <input 
      className="bg-stone-950 font-semibold text-white px-5 py-3 rounded-lg" 
      type="text"
      name='name'
      value={name}
      onChange={event => setName(event.target.value)}
      placeholder="Adicionar músculo"
    />
    <button type="submit" className="bg-amber-500 text-white px-5 py-3 rounded-lg">
      <AiOutlineCheck size={24} />
    </button>
  </form>
}

export default CreateMuscleForm