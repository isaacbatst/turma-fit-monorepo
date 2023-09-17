import { Muscle } from '@/types/Muscle'
import MuscleButton from './MuscleButton'

type Props = {
  muscle: Muscle
  startEdit: () => void
}

const MuscleListViewItem = ({muscle, startEdit}: Props) => {
  const onDelete = (id: string) => {
    console.log(id)
  }

  return (
    <li
      className="flex min-h-[56px] flex-1 gap-10 items-center justify-between bg-stone-950 text-white px-5 py-3 rounded-2xl" 
      key={muscle.id}>
      <p className="text-lg">{muscle.name}</p>
      <div className="flex gap-3">
        <MuscleButton onClick={() => startEdit()}>Editar</MuscleButton>
        <MuscleButton onClick={() => onDelete(muscle.id)}>Excluir</MuscleButton>
      </div>
    </li>
  )
}

export default MuscleListViewItem