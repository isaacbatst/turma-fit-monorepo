'use client'
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { GiMuscleUp } from 'react-icons/gi'
import { CgGym } from 'react-icons/cg'
import {RiAdminLine} from 'react-icons/ri'
import LogoutButton from './LogoutButton'
import SidebarLink from './SidebarLink'
import { usePathname } from 'next/navigation'
import { MdSportsGymnastics } from 'react-icons/md'

const links = [
  { href: '/', label: 'Início', Icon: AiOutlineHome },
  // { href: '/users', label: 'Usuários', Icon: AiOutlineUser },
  // { href: '/admins', label: 'Administradores', Icon: RiAdminLine },
  { href: '/muscles', label: 'Músculos', Icon: GiMuscleUp },
  // { href: '/moviments', label: 'Movimentos', Icon: MdSportsGymnastics },
  { href: '/equipments', label: 'Equipamentos', Icon: CgGym },
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