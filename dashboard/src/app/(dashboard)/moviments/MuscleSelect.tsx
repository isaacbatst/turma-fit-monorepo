import { Select } from 'antd'
import React from 'react'
import { useMuscles } from '../../../hooks/useMuscles'

type Props = {
  selectedMuscle: string | null
  setSelectedMuscle: (value: string) => void
}

const MuscleSelect = ({selectedMuscle, setSelectedMuscle}: Props) => {
  const {muscles, isLoading: isLoadingMuscles} = useMuscles();
  const musclesOptions = muscles?.map(muscle => ({value: muscle.id, label: muscle.name}))
  
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <Select
      loading={isLoadingMuscles}
      showSearch
      placeholder="Escolha um músculo"
      value={selectedMuscle}
      optionFilterProp="children"
      size='large'
      filterOption={filterOption}
      notFoundContent={<p className='p-3'>Nenhum músculo encontrado</p>}
      options={musclesOptions}
      onChange={(value) => setSelectedMuscle(value as string)}
    />
  )
}

export default MuscleSelect