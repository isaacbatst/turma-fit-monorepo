import { Form, Modal } from 'antd'
import React from 'react'
import { useSWRConfig } from 'swr'
import { Training } from '../../../types/Training'
import { useApiGateway } from '../../components/ApiGatewayContext'
import { AddExerciseErrorHandler } from './AddExerciseErrorHandler'
import AddExerciseForm, { AddExerciseFormValues } from './AddExerciseForm'
import ExerciseSetItem from './ExerciseSetItem'

type Props = {
  training: Training
}

const addExerciseErrorHandler = new AddExerciseErrorHandler()

const TrainingItem = ({training}: Props) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [addExerciseForm] = Form.useForm<AddExerciseFormValues>()
  const apiGateway = useApiGateway()
  const {mutate} = useSWRConfig()

  const submitAddExerciseForm = async () => {
    try {
      const values = addExerciseForm.getFieldsValue()
      await addExerciseForm.validateFields()
      await apiGateway.training.addExerciseSet({
        trainingId: training.id,
        repetitions: values.repetitions,
        sets: values.sets,
        exercise: {
          movimentId: values.moviment,
          equipmentIds: values.equipment,
          grip: values.grip,
        }
      })
      mutate('trainings')
      setIsModalVisible(false)
      addExerciseForm.resetFields()
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