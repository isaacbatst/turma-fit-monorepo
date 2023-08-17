'use client'
import { Muscle } from '../../../types/Muscle'
import useSWR from 'swr'
import { fetchMusclesFromFrontend } from './fetchMusclesFromFrontend'

type Props = {
  token: string
  muscles: Muscle[]
}

const useMuscles = (token: string, fallbackData: Muscle[]) => {
  const { data, error, isLoading } = useSWR('muscles', fetchMusclesFromFrontend, {
    fallbackData
  })
  return {
    muscles: data,
    isLoading,
    isError: error
  }
}
const MusclesList = ({muscles: musclesFallback, token}: Props) => {
  const { muscles } = useMuscles(token, musclesFallback)
  
  return (
    muscles.map(muscle => (
      <li
        className="flex gap-10 items-center bg-stone-950 text-white px-5 py-3 rounded-2xl" 
        key={muscle.id}>
        <p className="text-lg">{muscle.name}</p>
        <div className="flex gap-3">
          <button type="button" className="bg-stone-800 text-white px-3 py-1 rounded-md hover:scale-105 active:opacity-80">Editar</button>
          <button type="button" className="bg-stone-800 text-white px-3 py-1 rounded-md hover:scale-105 active:opacity-80">Excluir</button>
        </div>
      </li>
    ))
  )
}

export default MusclesList