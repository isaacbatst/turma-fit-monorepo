import { Form, Modal } from 'antd'
import React from 'react'
import { ResponseError } from '../../../errors/ResponseError'
import { Training } from '../../../types/Training'
import { AddExerciseErrorHandler } from './AddExerciseErrorHandler'
import AddExerciseForm, { AddExerciseFormValues } from './AddExerciseForm'
import { useSWRConfig } from 'swr'
import ExerciseSetItem from './ExerciseSetItem'

type Props = {
  training: Training
}

const addExerciseErrorHandler = new AddExerciseErrorHandler()

const TrainingItem = ({training}: Props) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [addExerciseForm] = Form.useForm<AddExerciseFormValues>()
  const {mutate} = useSWRConfig()

  const submitAddExerciseForm = async () => {
    try {
      const values = addExerciseForm.getFieldsValue()
      await addExerciseForm.validateFields()
      const response = await fetch(`http://localhost:5555/trainings/${training.id}/add-exercise-set`, {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify({
          repetitions: values.repetitions,
          sets: values.sets,
          exercise: {
            movimentId: values.moviment,
            equipmentIds: values.equipment,
            grip: values.grip,
          }
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if(response.status !== 204) {
        const data = await response.json()
        throw new ResponseError(data.message, response.status)
      }
      mutate('trainings')
      setIsModalVisible(false)
    } catch (error) {
      const message = addExerciseErrorHandler.getMessage(error)
      addExerciseErrorHandler.showToast(message)
    }
  }
  return (
    <div className='flex flex-col gap-3'>
      <ul className='flex flex-col gap-3'>
        {training.exerciseSets.map((exerciseSet) => (
          <ExerciseSetItem key={exerciseSet.id} exerciseSet={exerciseSet} />
        ))}
      </ul>
      <button
        className='bg-amber-500 hover:scale-105 active:opacity-80
          px-5 py-2 rounded-lg'
        onClick={() => setIsModalVisible(true)}
      >
        {training.exerciseSets.length === 0 ? 'Adicionar primeiro exercício' : 'Adicionar exercício'}
      </button>
      <Modal 
        title={`Criando exercício`}
        centered
        bodyStyle={{paddingTop: 20}}
        open={isModalVisible}
        onOk={submitAddExerciseForm}
        onCancel={() => setIsModalVisible(false)}
      >
        <AddExerciseForm form={addExerciseForm} />
      </Modal>
    </div>
  )
}

export default TrainingItem