import React from 'react'
import ItemActionButton from './ItemActionButton'
import Loading from './Loading'

type Props = {
  item: {id: string, name: string}
  startEdit: () => void
  onDelete: () => void
  isDeleting: boolean
}

const ListViewItem = ({item, isDeleting, onDelete, startEdit}: Props) => {
  return (
    <li
      className="flex min-h-[56px] flex-1 gap-10 items-center justify-between 
        bg-stone-950 text-white border border-stone-800
        px-5 py-3 rounded-lg" 
      key={item.id}>
      <p className="text-lg">{item.name}</p>
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

export default ListViewItem