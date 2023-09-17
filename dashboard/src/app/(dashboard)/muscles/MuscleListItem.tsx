import React from 'react'
import MuscleListViewItem from './MuscleListViewItem'
import { Muscle } from '@/types/Muscle'
import MuscleListEditItem from './MuscleListEditItem'

type Props = {
  muscle: Muscle
}

const MuscleListItem = ({muscle}: Props) => {
  const [isEditing, setIsEditing] = React.useState(false)

  return isEditing ? (
    <MuscleListEditItem  muscle={muscle} finishEdit={() => setIsEditing(false)} />
  ) : (
    <MuscleListViewItem muscle={muscle} startEdit={() => setIsEditing(true)} />
  )
}

export default MuscleListItem