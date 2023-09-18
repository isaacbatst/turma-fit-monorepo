'use client'
import useSWR from 'swr'
import MuscleListItem from './MuscleListItem'
import { fetchMusclesFromFrontend } from './fetchMusclesFromFrontend'
import Loading from '../../components/Loading'

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
  const { muscles, isLoading } = useMuscles()
  return isLoading 
    ? <li className='flex flex-1 justify-center items-center'><Loading /></li>
    :
    (
      muscles?.map(muscle => <MuscleListItem muscle={muscle} key={muscle.id} />)
    )
}

export default MusclesList