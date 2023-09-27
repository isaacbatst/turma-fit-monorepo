'use client'
import { useEquipments } from '@/hooks/useEquipments'
import Loading from '../../components/Loading'
import EquipmentListItem from './EquipmentListItem'

const EquipmentsList = () => {
  const { equipments, isLoading } = useEquipments()
  return isLoading 
    ? <li className='flex flex-1 justify-center items-center'><Loading /></li>
    :
    (
      equipments?.map(equipment => <EquipmentListItem equipment={equipment} key={equipment.id} />)
    )
}

export default EquipmentsList