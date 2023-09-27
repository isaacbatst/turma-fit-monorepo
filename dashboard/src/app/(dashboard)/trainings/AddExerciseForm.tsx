import { Form, FormInstance, InputNumber } from 'antd';
import { useState } from 'react';
import { Grip } from '../../../types/Grip';
import EquipmentSelect from '../../components/Selects/EquipmentSelect';
import GripSelect from '../../components/Selects/GripSelect';
import MovimentSelect from '../../components/Selects/MovimentSelect';

export type AddExerciseFormValues = {
  equipment: string[]
  grip: Grip
  moviment: string
  repetitions: number
  sets: number
}

type Props = {
  form: FormInstance<AddExerciseFormValues>
}

const AddExerciseForm = ({form}: Props) => {
  const [sets, setSets] = useState<number | null>(null) 
  const [repetitions, setRepetitions] = useState<number | null>(null)
  const [selectedMoviment, setSelectedMoviment] = useState<string | null>(null)
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null)
  const [selectedGrip, setSelectedGrip] = useState<Grip | null>(null)
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      form={form}
    >
      <Form.Item<AddExerciseFormValues>
        label="Sets"
        name="sets"
        rules={[{ required: true, message: 'Informe a quantidade de sets!' }]}
      >
        <InputNumber 
          placeholder='3'
          min={1} value={sets} onChange={setSets} />
      </Form.Item>

      <Form.Item<AddExerciseFormValues>
        label="Repetições"
        name="repetitions"
        rules={[{ required: true, message: 'Informe a quantidade de repetições!' }]}
      >
        <InputNumber 
          placeholder='10'
          min={1} value={repetitions} onChange={setRepetitions} />
      </Form.Item>
      <Form.Item<AddExerciseFormValues> 
        rules={[{ required: true, message: 'Informe o movimento!' }]}
        label="Movimento" name='moviment'>
        <MovimentSelect 
          onChange={(selected) => setSelectedMoviment(selected)} 
          value={selectedMoviment} 
        />
      </Form.Item>
      <Form.Item<AddExerciseFormValues> 
        label="Equipamento" name='equipment'>
        <EquipmentSelect 
          onChange={(selected) => setSelectedEquipment(selected)} 
          value={selectedEquipment} 
        />
      </Form.Item>
      <Form.Item<AddExerciseFormValues> 
        label="Pegada" name='grip'>
        <GripSelect 
          onChange={(selected) => setSelectedGrip(selected)} 
          value={selectedGrip} 
        />
      </Form.Item>
    </Form>
  )
}

export default AddExerciseForm