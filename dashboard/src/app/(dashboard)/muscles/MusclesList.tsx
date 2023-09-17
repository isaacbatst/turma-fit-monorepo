'use client'
import useSWR from 'swr'
import MuscleListItem from './MuscleListItem'
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
  const { muscles } = useMuscles()
  return (
    muscles?.map(muscle => <MuscleListItem muscle={muscle} key={muscle.id} />)
  )
}

export default MusclesList