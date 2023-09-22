'use client'
import { useMuscles } from '../../../hooks/useMuscles'
import Loading from '../../components/Loading'
import MuscleListItem from './MuscleListItem'

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