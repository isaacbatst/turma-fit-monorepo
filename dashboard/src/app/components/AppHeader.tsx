import Image from 'next/image'
import Link from 'next/link'

const AppHeader = () => {
  return (
    <header className='flex justify-between items-center p-5'>
      <Image 
        alt='Logo Turma Fit' 
        src='/turma-fit/base/icon/base_icon_transparent_background.png' 
        height={80} width={80} 
      />
      <Link href='/my-account' className='font-semibold hover:scale-105 active:opacity-80'>Minha Conta</Link>
    </header>
  )
}

export default AppHeader