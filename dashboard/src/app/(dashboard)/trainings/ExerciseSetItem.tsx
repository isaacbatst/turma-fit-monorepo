import { ExerciseSet } from '../../../types/Training'

type Props = {
  exerciseSet: ExerciseSet
}

const ExerciseSetItem = ({exerciseSet}: Props) => {
  return (
    <li className='flex flex-1 gap-2 bg-slate-900 bg-opacity-40 p-2 border border-slate-700 rounded-lg justify-between'>
      <p>{exerciseSet.name}</p>
      <p>{exerciseSet.sets}x{exerciseSet.repetitions}</p>
    </li>
  )
}

export default ExerciseSetItem