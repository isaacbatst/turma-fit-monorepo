'use client'
import React from 'react'
import { MdLogout } from 'react-icons/md'
import { useApiGateway } from './ApiGatewayContext'

const LogoutButton = () => {
  const apiGateway = useApiGateway()
  const logout = async () => {
    await apiGateway.auth.logout()
    window.location.href = '/login'
  }

  return (
    <button className='flex' type='button' onClick={logout}>
      <MdLogout size={24} />
      Sair
    </button>
  )
}

export default LogoutButton