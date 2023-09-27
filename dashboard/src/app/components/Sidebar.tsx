'use client'
import { usePathname } from 'next/navigation'
import { AiOutlineHome } from 'react-icons/ai'
import { CgGym } from 'react-icons/cg'
import { GiMuscleUp } from 'react-icons/gi'
import { MdSportsGymnastics } from 'react-icons/md'
import {BiSpreadsheet} from 'react-icons/bi'
import LogoutButton from './LogoutButton'
import SidebarLink from './SidebarLink'

const links = [
  { href: '/', label: 'Início', Icon: AiOutlineHome },
  // { href: '/users', label: 'Usuários', Icon: AiOutlineUser },
  // { href: '/admins', label: 'Administradores', Icon: RiAdminLine },
  { href: '/muscles', label: 'Músculos', Icon: GiMuscleUp },
  { href: '/equipments', label: 'Equipamentos', Icon: CgGym },
  { href: '/moviments', label: 'Movimentos', Icon: MdSportsGymnastics },
  { href: '/trainings', label: 'Treinos ', Icon: BiSpreadsheet },
]

const Sidebar = () => {
  const pathname = usePathname()
  return (
    <nav className='w-[300px] px-7 flex flex-col justify-between pt-10 pb-20 text-stone-400'>
      <div className='flex flex-col gap-3'>
        {links.map(({ href, label, Icon }) => (
          <SidebarLink key={href} href={href} label={label} Icon={Icon} isActive={href === pathname} />
        ))}
      </div>
      <LogoutButton />

    </nav>
  )
}

export default Sidebar