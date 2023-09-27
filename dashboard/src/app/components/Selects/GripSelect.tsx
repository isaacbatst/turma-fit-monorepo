import { Select } from 'antd'
import { Grip } from '../../../types/Grip'

type Props = {
  value: string | null
  onChange: (value: Grip) => void
}

const toFriendlyGrip = (grip: Grip) => {
  switch (grip) {
  case Grip.pronated: return 'Pronada'
  case Grip.supinated: return 'Supinada'
  case Grip.neutral: return 'Neutra'
  }
}

const GripSelect = ({onChange, value}: Props) => {
  return (
    <Select placeholder="Pronada"
      showSearch
      value={value as Grip}
      onChange={onChange}
      allowClear
      optionFilterProp="children"
      notFoundContent={<p className='p-3'>Nenhum movimento encontrado</p>}
    >
      {Object.values(Grip).map((grip) => (
        <Select.Option key={grip}  
          value={grip}>{toFriendlyGrip(grip)}</Select.Option>
      ))}
    </Select>
  )
}

export default GripSelect