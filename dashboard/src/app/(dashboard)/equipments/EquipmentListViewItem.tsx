import { Equipment } from '@/types/Equipment'
import ItemActionButton from '@/app/components/ItemActionButton'
import { useSWRConfig } from 'swr'
import { useState } from 'react'
import Loading from '@/app/components/Loading'
import { toast } from 'react-toastify'

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
    <li
      className="flex min-h-[56px] flex-1 gap-10 items-center justify-between bg-stone-950 text-white px-5 py-3 rounded-2xl" 
      key={equipment.id}>
      <p className="text-lg">{equipment.name}</p>
      <div className="flex gap-3">
        <ItemActionButton onClick={() => startEdit()}>Editar</ItemActionButton>
        <ItemActionButton
          disabled={isDeleting}
          onClick={() => onDelete()}>
          {isDeleting ? <Loading /> : 'Excluir'}
        </ItemActionButton>
      </div>
    </li>
  )
}

export default EquipmentListViewItem