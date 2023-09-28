'use client'
import React from 'react'
import { MdLogout } from 'react-icons/md'
import { useApiGateway } from './ApiGatewayContext'

type Props = {
  isCollapsed?: boolean
}

const LogoutButton = ({isCollapsed = false}: Props) => {
  const apiGateway = useApiGateway()
  const logout = async () => {
    await apiGateway.auth.logout()
    window.location.href = '/login'
  }

  return (
    <button className='flex gap-3 items-center p-3 rounded-md hover:bg-stone-700 hover:text-white' 
      type='button' onClick={logout}>
      <MdLogout size={24} />
      <span className={`${isCollapsed ? 'hidden': 'inline'}`}>Sair</span>
    </button>
  )
}

export default LogoutButton