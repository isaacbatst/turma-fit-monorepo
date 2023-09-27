import { Equipment } from '@/types/Equipment'
import { useSWRConfig } from 'swr'
import { useSubmitForm } from '../../../hooks/useSubmitForm'
import { useApiGateway } from '../../components/ApiGatewayContext'
import ListViewItem from '../../components/ListViewItem'
import { DeleteEquipmentErrorHandler } from './DeleteEquipmentErrorHandler'

type Props = {
  equipment: Equipment
  startEdit: () => void
}

const errorHandler = new DeleteEquipmentErrorHandler()

const EquipmentListViewItem = ({equipment, startEdit}: Props) => {
  const {mutate} = useSWRConfig()
  const apiGateway = useApiGateway()
  const {submit, isSubmitting} = useSubmitForm({
    errorHandler,
    validateAndFetch: () => apiGateway.equipments.deleteEquipment(equipment.id),
  })

  const onDelete = async () => {
    await submit()
    await mutate('equipments')
  }

  return (
    <ListViewItem 
      isDeleting={isSubmitting}
      item={equipment}
      onDelete={onDelete}
      startEdit={startEdit}
    />
  )
}

export default EquipmentListViewItem