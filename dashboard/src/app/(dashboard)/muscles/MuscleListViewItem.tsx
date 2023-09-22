import { Muscle } from '@/types/Muscle'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useSWRConfig } from 'swr'
import ListViewItem from '../../components/ListViewItem'

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
    <ListViewItem 
      isDeleting={isDeleting}
      item={muscle}
      onDelete={onDelete}
      startEdit={startEdit}
    />
  )
}

export default MuscleListViewItem