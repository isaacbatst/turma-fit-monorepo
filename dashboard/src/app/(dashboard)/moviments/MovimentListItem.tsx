import { Moviment } from '@/types/Moviment'
import React from 'react'
import { useSWRConfig } from 'swr'
import { ErrorHandler } from '../../../errors/ErrorHandler'
import { useSubmitForm } from '../../../hooks/useSubmitForm'
import { useApiGateway } from '../../components/ApiGatewayContext'
import MovimentListItemEdit from './MovimentListItemEdit'
import MovimentListItemView from './MovimentListItemView'

type Props = {
  moviment: Moviment
  index: number
}

class DeleteMovimentErrorHandler extends ErrorHandler {
  protected formErrorMessages: Record<string, string> = {}
  protected responseErrorMessages: Record<number, (error: string) => string | undefined> = {
    404: () => 'Movimento não encontrado',
  }
}

const MovimentListItem = ({moviment, index}: Props) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const apiGateway = useApiGateway()
  const {mutate} = useSWRConfig()
  const {isSubmitting: isDeleting, submit} = useSubmitForm({
    validateAndFetch: () => apiGateway.moviments.deleteMoviment(moviment.id),
    errorHandler: new DeleteMovimentErrorHandler()
  })

  const deleteMoviment = async () => {
    await submit()
    await mutate('moviments')
  }
    
  return (
    <li 
      className='relative flex flex-col gap-3 
      bg-slate-300 bg-opacity-10 border border-stone-400 border-opacity-30  
      p-5 rounded-lg self-start
      focus:border-white'
      tabIndex={index}
    >
      {
        isEditing 
          ? <MovimentListItemEdit moviment={moviment} setIsEditing={setIsEditing} /> 
          : (
            <MovimentListItemView  
              moviment={moviment}
              isDeleting={isDeleting}
              deleteMoviment={deleteMoviment}
              startEdit={() => setIsEditing(true)}
            />
          )
      }
    </li>
  )
}

export default MovimentListItem