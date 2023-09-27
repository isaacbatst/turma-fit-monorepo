import React from 'react'
import { Training } from '../../../types/Training'
import { Grip } from '../../../types/Grip'

type Props = {
  exerciseSet: Training['exerciseSets'][0]
}

const gripToFriendlyName = (grip: Grip) => {
  switch (grip) {
  case 'pronated':
    return 'Pronada 🤚'
  case 'supinated':
    return 'Supinada 🖐️'
  case 'neutral':
    return 'Neutra'
  }
}

const ExerciseSetItem = ({exerciseSet}: Props) => {
  return (
    <li className='flex gap-2 bg-slate-900 bg-opacity-40 p-2 border border-slate-700 rounded-lg justify-between'>
      <p>
        {exerciseSet.exercises.map(exercise => {
          const exerciseName = `${exercise.moviment.name}${exercise.grip ? ` ${gripToFriendlyName(exercise.grip)}` : ''}`
          const equipmentNames = exercise.equipments.map(equipment => equipment.name).join(' ou ')
          return `${exerciseName} ${equipmentNames}`
        }).join(' + ')}
      </p>
      <p>{exerciseSet.sets}x{exerciseSet.repetitions}</p>

    </li>
  )
}

export default ExerciseSetItem