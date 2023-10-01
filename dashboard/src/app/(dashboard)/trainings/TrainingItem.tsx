import { DragEndEvent } from '@dnd-kit/core'
import { Form, Modal } from 'antd'
import React, { useMemo } from 'react'
import { useSWRConfig } from 'swr'
import { Training } from '../../../types/Training'
import { useApiGateway } from '../../components/ApiGatewayContext'
import SortableList from '../../components/Sortable/SortableList'
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

  const orderedExerciseSets = useMemo(() => training.exerciseSets.slice().sort(
    (a, b) => a.order - b.order
  ), [training.exerciseSets])

  const updateOrder = async (e: DragEndEvent) => {
    const overIndex = orderedExerciseSets.findIndex(exerciseSet => exerciseSet.id === e.over?.id)
    const over = orderedExerciseSets[overIndex]
    const {order} = over
    await mutate<Training[]>('trainings', async (trainings) => {
      await apiGateway.training.changeExerciseSetOrder({
        exerciseSetId: e.active.id as string, 
        trainingId: training.id,
        order,
      })  
      return trainings
    })
  }

  return (
    <div className='flex flex-col gap-3'>
      <SortableList items={orderedExerciseSets} 
        renderItem={(item) => <ExerciseSetItem exerciseSet={item} />}
        handleDragEnd={updateOrder}
      />
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