'use client'
import CreateMuscleForm from './CreateMuscleForm'
import MusclesList from './MusclesList'

const MusclesSection = () => {
  return (
    <section>
      <h2 className="text-center text-3xl font-semibold mb-10">Músculos</h2>
      <ul className="grid xl:grid-cols-2 2xl:grid-cols-3 gap-3 my-10">
        <CreateMuscleForm />
        <MusclesList />
      </ul>
    </section>
  )
}

export default MusclesSection