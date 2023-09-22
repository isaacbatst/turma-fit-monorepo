import { Equipment } from '@/types/Equipment'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useSWRConfig } from 'swr'
import ListViewItem from '../../components/ListViewItem'

type Props = {
  equipment: Equipment
  startEdit: () => void
}

const deleteErrors: Record<number, string> = {
  404: 'Músculo não encontrado',
}

const EquipmentListViewItem = ({equipment, startEdit}: Props) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const {mutate} = useSWRConfig()
  const onDelete = async () => {
    try {
      setIsDeleting(true)
      const response = await fetch(`http://localhost:5555/equipments/${equipment.id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if(response.status === 204){
        await mutate('equipments')
        return
      }

      const error = deleteErrors[response.status] ?? 'Erro ao excluir músculo'
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
      item={equipment}
      onDelete={onDelete}
      startEdit={startEdit}
    />
  )
}

export default EquipmentListViewItem