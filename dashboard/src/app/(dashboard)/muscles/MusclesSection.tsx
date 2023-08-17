'use client'
import { Muscle } from '../../../types/Muscle'
import CreateMuscleForm from './CreateMuscleForm'
import MusclesList from './MusclesList'

type Props = {
  muscles: Muscle[]
  token: string
}


const MusclesSection = ({muscles, token}: Props) => {
  return (
    <section>
      <h2 className="text-center text-3xl font-semibold mb-10">Músculos</h2>
      <ul className="flex flex-wrap gap-3 my-10">
        <CreateMuscleForm />
        <MusclesList muscles={muscles} token={token} />
      </ul>
    </section>
  )
}

export default MusclesSection