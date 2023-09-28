'use client'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineMenu } from 'react-icons/ai'
import { useSidebarContext } from '../contexts/SidebarContext'

const AppHeader = () => {
  const {toggleSidebar} = useSidebarContext()
  return (
    <header className='flex justify-between items-center px-5 lg:px-20 py-5'>
      <Image 
        alt='Logo Turma Fit' 
        className='hidden sm:inline'
        src='/turma-fit/base/full/base_logo_transparent_background.png' 
        height={90} width={150} 
      />
      <div className='flex items-center gap-4 sm:hidden'>
        <button type="button" onClick={() => {
          console.log('togglin')
          toggleSidebar()
        }}>
          <AiOutlineMenu size={24} className='cursor-pointer' />
        </button>
        <Image 
          alt='Logo Turma Fit' 
          src='/turma-fit/black/icon/white_icon_black_background.png' 
          height={30} width={40} 
        />
      </div>
      <Link href='/my-account' className='font-semibold hover:scale-105 active:opacity-80'>Minha Conta</Link>
    </header>
  )
}

export default AppHeader