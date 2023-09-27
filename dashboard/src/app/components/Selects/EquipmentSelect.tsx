import { Select } from 'antd'
import { useEquipments } from '@/hooks/useEquipments'

type Props = {
  value: string | null
  onChange: (value: string) => void
}

const EquipmentSelect = ({onChange, value}: Props) => {
  const {equipments, isLoading: isLoadingEquipments} = useEquipments()
  return (
    <Select placeholder="Barra Reta"
      loading={isLoadingEquipments}
      showSearch
      value={value}
      mode='multiple'
      onChange={onChange}
      
      optionFilterProp="children"
      notFoundContent={<p className='p-3'>Nenhum equipamento encontrado</p>}
    >
      {equipments?.map((equipment) => (
        <Select.Option key={equipment.id}  
          value={equipment.id}>{equipment.name}</Select.Option>
      ))}
    </Select>
  )
}

export default EquipmentSelect