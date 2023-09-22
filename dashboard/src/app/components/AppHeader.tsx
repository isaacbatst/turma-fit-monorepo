import Image from 'next/image'
import Link from 'next/link'

const AppHeader = () => {
  return (
    <header className='flex justify-between items-center p-5 md:px-20'>
      <Link href='/'><Image 
        alt='Logo Turma Fit' 
        src='/turma-fit/base/full/base_logo_transparent_background.png' 
        height={150} width={150} 
      /></Link>
      <Link href='/my-account' className='font-semibold hover:scale-105 active:opacity-80'>Minha Conta</Link>
    </header>
  )
}

export default AppHeader