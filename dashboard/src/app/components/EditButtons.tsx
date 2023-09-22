import EditCancelButton from './EditCancelButton'
import EditConfirmButton from './EditConfirmButton'

type Props = {
  isLoading: boolean
  finishEdit: () => void
}

const EditButtons = ({finishEdit, isLoading}: Props) => {
  return (
    <div className='flex gap-2'>
      <EditConfirmButton 
        isLoading={isLoading}
      />
      <EditCancelButton 
        cancelEdit={finishEdit}
      />
    </div>
  )
}

export default EditButtons