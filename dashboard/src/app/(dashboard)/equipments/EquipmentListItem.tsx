import React from 'react'
import EquipmentListViewItem from './EquipmentListViewItem'
import EquipmentListEditItem from './EquipmentListEditItem'
import { Equipment } from '../../../types/Equipment'

type Props = {
  equipment: Equipment
}

const EquipmentListItem = ({equipment}: Props) => {
  const [isEditing, setIsEditing] = React.useState(false)

  return isEditing ? (
    <EquipmentListEditItem  equipment={equipment} finishEdit={() => setIsEditing(false)} />
  ) : (
    <EquipmentListViewItem equipment={equipment} startEdit={() => setIsEditing(true)} />
  )
}

export default EquipmentListItem