'use client'
import useSWR from 'swr'
import MuscleButton from './MuscleButton'
import { fetchMusclesFromFrontend } from './fetchMusclesFromFrontend'

const useMuscles = () => {
  const { data, error, isLoading, mutate } = useSWR('muscles', fetchMusclesFromFrontend)
  return {
    muscles: data,
    isLoading,
    isError: error,
    mutate
  }
}
const MusclesList = () => {
  const { muscles, mutate } = useMuscles()

  const onEdit = async (id: string) => {
    const response = await fetch(`http://localhost:5555/muscles/${id}`, {
      body: JSON.stringify({
        name: 'ATUALI3333ZADO'
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      credentials: 'include',
    })
    
    if(response.status === 204) {
      await mutate()
    }
  }
  const onDelete = (id: string) => {
    console.log(id)
  }
  
  return (
    muscles?.map(muscle => (
      <li
        className="flex gap-10 items-center bg-stone-950 text-white px-5 py-3 rounded-2xl" 
        key={muscle.id}>
        <p className="text-lg">{muscle.name}</p>
        <div className="flex gap-3">
          <MuscleButton onClick={() => onEdit(muscle.id)}>Editar</MuscleButton>
          <MuscleButton onClick={() => onDelete(muscle.id)}>Excluir</MuscleButton>
        </div>
      </li>
    ))
  )
}

export default MusclesList