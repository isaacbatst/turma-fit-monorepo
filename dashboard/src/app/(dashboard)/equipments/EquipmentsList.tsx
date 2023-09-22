'use client'
import useSWR from 'swr'
import EquipmentListItem from './EquipmentListItem'
import { fetchEquipments } from './fetchEquipments'
import Loading from '../../components/Loading'

const useEquipments = () => {
  const { data, error, isLoading, mutate } = useSWR('equipments', fetchEquipments)
  return {
    data,
    isLoading,
    isError: error,
    mutate
  }
}

const EquipmentsList = () => {
  const { data: equipments, isLoading } = useEquipments()
  return isLoading 
    ? <li className='flex flex-1 justify-center items-center'><Loading /></li>
    :
    (
      equipments?.map(equipment => <EquipmentListItem equipment={equipment} key={equipment.id} />)
    )
}

export default EquipmentsList