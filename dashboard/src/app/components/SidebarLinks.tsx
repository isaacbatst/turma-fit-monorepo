'use client'
import React from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { BiSpreadsheet } from 'react-icons/bi'
import { CgGym } from 'react-icons/cg'
import { GiMuscleUp } from 'react-icons/gi'
import { MdSportsGymnastics } from 'react-icons/md'
import SidebarLink from './SidebarLink'
import { usePathname } from 'next/navigation'

type Props = {
  onClickLink?: () => void
}

const links = [
  { href: '/', label: 'Início', Icon: AiOutlineHome },
  // { href: '/users', label: 'Usuários', Icon: AiOutlineUser },
  // { href: '/admins', label: 'Administradores', Icon: RiAdminLine },
  { href: '/muscles', label: 'Músculos', Icon: GiMuscleUp },
  { href: '/equipments', label: 'Equipamentos', Icon: CgGym },
  { href: '/moviments', label: 'Movimentos', Icon: MdSportsGymnastics },
  { href: '/trainings', label: 'Treinos ', Icon: BiSpreadsheet },
]

const SidebarLinks = ({onClickLink: onClick}: Props) => {
  const pathname = usePathname()
  return (
    links.map(({ href, label, Icon }) => (
      <SidebarLink key={href} 
        onClick={onClick}
        href={href} label={label} Icon={Icon} isActive={href === pathname} 
      />
    ))
  )
}

export default SidebarLinks