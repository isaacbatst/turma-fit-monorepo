'use client'; 
import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';

const postMuscle = async (name: string) => {
  await fetch('/api/muscles', {
    method: 'POST',
    body: JSON.stringify({ name })
  });

}

const CreateMuscleForm = () => {
  const ref = React.useRef<HTMLInputElement>(null)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = ref.current?.value ?? ''
    await postMuscle(name)
  }

  return  <form className="flex flex-1 gap-3"
    onSubmit={onSubmit}
  >
    <input 
      ref={ref}
      className="bg-stone-950 font-semibold text-white px-5 py-3 rounded-2xl" 
      type="text"
      name='name'
      placeholder="Adicionar músculo"
    />
    <button type="submit" className="bg-amber-500 text-white px-5 py-3 rounded-lg">
      <AiOutlineCheck size={24} />
    </button>
  </form>
}

export default CreateMuscleForm