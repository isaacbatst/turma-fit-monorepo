import { AiOutlineClose } from 'react-icons/ai'

type Props = {
  cancelEdit: () => void
}

const EditCancelButton = ({cancelEdit}: Props) => {
  return (
    <button className='bg-red-600 px-5 text-white rounded-2xl' 
      onClick={cancelEdit}><AiOutlineClose />
    </button>
  )
}

export default EditCancelButton