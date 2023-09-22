import React from 'react'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { useSWRConfig } from 'swr'
import Loading from '../../components/Loading'
import { toast } from 'react-toastify'
import { Equipment } from '../../../types/Equipment'

type Props = {
  equipment: Equipment,
  finishEdit(): void
}

const editErrors: Record<string, string> = {
  'NAME_ALREADY_EXISTS': 'Já existe um equipamento com esse nome',
  'REQUIRED_NAME': 'O nome é obrigatório',
  'NOT_FOUND': 'Equipamento não encontrado',
}

const EquipmentListEditItem = ({equipment, finishEdit}: Props) => {
  const {mutate} = useSWRConfig()
  const [name, setName] = React.useState(equipment.name)
  const [isLoading, setIsLoading] = React.useState(false)

  const submitEdit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const response = await fetch(`http://localhost:5555/equipments/${equipment.id}`, {
        body: JSON.stringify({
          name
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        credentials: 'include',
      })

      if(response.status === 204) {
        await mutate('equipments')
        return finishEdit()
      }

      const data = await response.json();
      const error = editErrors[data.message]
      toast.error(error, {
        theme: 'dark',
        position: 'bottom-right',
        autoClose: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  } 

  return (
    <li
      className="flex flex-1 min-h-[56px] justify-between text-lg text-stone-900 rounded-2xl" 
      key={equipment.id}>
      <form onSubmit={submitEdit} className='flex flex-1 gap-2'>
        <input className='rounded-2xl px-3 flex-1 bg-white ' type="text" name="edit-equipment" 
          value={name}
          onChange={(e) => setName(e.target.value)} 
        />
        <div className='flex gap-2'>
          <button className='bg-green-600 px-5 text-white rounded-2xl'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? <Loading color='white' /> : <AiOutlineCheck />}
          </button>
          <button className='bg-red-600 px-5 text-white rounded-2xl' 
            onClick={finishEdit}><AiOutlineClose /></button>
        </div>
      </form>
    </li>
  )
}

export default EquipmentListEditItem