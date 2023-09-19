import { Muscle } from '@/types/Muscle'
import MuscleButton from './MuscleButton'
import { useSWRConfig } from 'swr'
import { useState } from 'react'
import Loading from '../../components/Loading'
import { toast } from 'react-toastify'

type Props = {
  muscle: Muscle
  startEdit: () => void
}

const deleteMuscleErrors: Record<number, string> = {
  404: 'Músculo não encontrado',
}

const MuscleListViewItem = ({muscle, startEdit}: Props) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const {mutate} = useSWRConfig()
  const onDelete = async () => {
    try {
      setIsDeleting(true)
      const response = await fetch(`http://localhost:5555/muscles/${muscle.id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if(response.status === 204){
        await mutate('muscles')
        return
      }

      const error = deleteMuscleErrors[response.status] ?? 'Erro ao excluir músculo'
      toast.error(error, {
        theme: 'dark',
        position: 'bottom-right',
        autoClose: 3000,
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <li
      className="flex min-h-[56px] flex-1 gap-10 items-center justify-between bg-stone-950 text-white px-5 py-3 rounded-2xl" 
      key={muscle.id}>
      <p className="text-lg">{muscle.name}</p>
      <div className="flex gap-3">
        <MuscleButton onClick={() => startEdit()}>Editar</MuscleButton>
        <MuscleButton
          disabled={isDeleting}
          onClick={() => onDelete()}>
          {isDeleting ? <Loading /> : 'Excluir'}
        </MuscleButton>
      </div>
    </li>
  )
}

export default MuscleListViewItem