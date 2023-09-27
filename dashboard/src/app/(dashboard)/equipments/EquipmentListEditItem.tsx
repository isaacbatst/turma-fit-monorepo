import React from 'react'
import { useSWRConfig } from 'swr'
import { useSubmitForm } from '../../../hooks/useSubmitForm'
import { Equipment } from '../../../types/Equipment'
import { useApiGateway } from '../../components/ApiGatewayContext'
import EditButtons from '../../components/EditButtons'
import InputEdit from '../../components/InputEdit'
import { EditEquipmentErrorHandler } from './EditEquipmentErrorHandler'

type Props = {
  equipment: Equipment,
  finishEdit(): void
}

const errorHandler = new EditEquipmentErrorHandler()

const EquipmentListEditItem = ({equipment, finishEdit}: Props) => {
  const {mutate} = useSWRConfig()
  const [name, setName] = React.useState(equipment.name)
  const apiGateway = useApiGateway()
  const {isSubmitting, submit} = useSubmitForm({
    errorHandler,
    validateAndFetch: () => apiGateway.equipments.editEquipment(equipment.id, name),
  })

  const submitEdit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await submit()
    await mutate('equipments')
    finishEdit()
  } 

  return (
    <li
      className="flex flex-1 min-h-[56px] justify-between text-lg text-stone-900 rounded-2xl" 
      key={equipment.id}>
      <form onSubmit={submitEdit} className='flex flex-1 gap-2'>
        <InputEdit 
          inputName='name'
          setValue={setName}
          value={name}
          cancelEdit={finishEdit}
        />
        <EditButtons 
          finishEdit={finishEdit}
          isLoading={isSubmitting}
        />
      </form>
    </li>
  )
}

export default EquipmentListEditItem