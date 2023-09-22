import React from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import Loading from './Loading'

type Props = {
  isLoading: boolean
}

const EditConfirmButton = ({isLoading}: Props) => {
  return (
    <button className='bg-green-600 px-5 text-white rounded-2xl'
      type='submit'
      disabled={isLoading}
    >
      {isLoading ? <Loading color='white' /> : <AiOutlineCheck />}
    </button>
  )
}

export default EditConfirmButton