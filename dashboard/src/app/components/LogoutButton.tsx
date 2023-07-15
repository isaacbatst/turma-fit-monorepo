'use client'
import React from 'react'
import { MdLogout } from 'react-icons/md'

const LogoutButton = () => {
  const logout = async () => {
    await fetch('/api/logout', {
      method: 'POST'
    })
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