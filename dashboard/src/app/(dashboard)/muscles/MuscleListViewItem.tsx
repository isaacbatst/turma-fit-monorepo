import { Muscle } from '@/types/Muscle'
import { useSWRConfig } from 'swr'
import { ErrorHandler } from '../../../errors/ErrorHandler'
import { useSubmitForm } from '../../../hooks/useSubmitForm'
import { useApiGateway } from '../../components/ApiGatewayContext'
import ListViewItem from '../../components/ListViewItem'

type Props = {
  muscle: Muscle
  startEdit: () => void
}

class DeleteMuscleErrorHandler extends ErrorHandler {
  protected formErrorMessages: Record<string, string> = {}
  protected responseErrorMessages: Record<number, (error: string) => string | undefined> = {
    404: () => 'Músculo não encontrado',
  }
}

const MuscleListViewItem = ({muscle, startEdit}: Props) => {
  const {mutate} = useSWRConfig()
  const apiGateway = useApiGateway()
  const {isSubmitting: isDeleting, submit} = useSubmitForm({
    validateAndFetch: () => apiGateway.muscles.deleteMuscle(muscle.id),
    errorHandler: new DeleteMuscleErrorHandler(),
  })
  const onDelete = async () => {
    await submit()
    await mutate('muscles')
  }

  return (
    <ListViewItem 
      isDeleting={isDeleting}
      item={muscle}
      onDelete={onDelete}
      startEdit={startEdit}
    />
  )
}

export default MuscleListViewItem