'use client'
import SectionTitle from '../../components/SectionTitle'
import CreateMuscleForm from './CreateMuscleForm'
import MusclesList from './MusclesList'

const MusclesSection = () => {
  return (
    <section>
      <SectionTitle>Músculos</SectionTitle>
      <ul className="grid xl:grid-cols-2 2xl:grid-cols-3 gap-3 my-10">
        <CreateMuscleForm />
        <MusclesList />
      </ul>
    </section>
  )
}

export default MusclesSection