import { Select } from 'antd'
import { useMoviments } from '../../../hooks/useMoviments'

type Props = {
  value: string | null
  onChange: (value: string) => void
}

const MovimentSelect = ({onChange, value}: Props) => {
  const {moviments, isLoading: isLoadingMoviments} = useMoviments()
  return (
    <Select placeholder="Levantamento terra"
      loading={isLoadingMoviments}
      showSearch
      value={value}
      onChange={onChange}
      optionFilterProp="children"
      notFoundContent={<p className='p-3'>Nenhum movimento encontrado</p>}
    >
      {moviments?.map((moviment) => (
        <Select.Option key={moviment.id}  
          value={moviment.id}>{moviment.name}</Select.Option>
      ))}
    </Select>
  )
}

export default MovimentSelect