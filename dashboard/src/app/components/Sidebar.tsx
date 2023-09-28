'use client'
import { Layout, Menu, MenuProps } from 'antd'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { IconType } from 'react-icons'
import { AiOutlineHome } from 'react-icons/ai'
import { BiSpreadsheet } from 'react-icons/bi'
import { CgGym } from 'react-icons/cg'
import { GiMuscleUp } from 'react-icons/gi'
import { MdSportsGymnastics } from 'react-icons/md'

const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number];

const links = [
  { href: '/', label: 'Início', Icon: AiOutlineHome },
  // { href: '/users', label: 'Usuários', Icon: AiOutlineUser },
  // { href: '/admins', label: 'Administradores', Icon: RiAdminLine },
  { href: '/muscles', label: 'Músculos', Icon: GiMuscleUp },
  { href: '/equipments', label: 'Equipamentos', Icon: CgGym },
  { href: '/moviments', label: 'Movimentos', Icon: MdSportsGymnastics },
  { href: '/trainings', label: 'Treinos ', Icon: BiSpreadsheet },
]

const getLinkItem = (href: string, label: string, Icon: IconType): MenuItem => ({
  label,
  icon: <Icon size={24} />,
  onClick: () => window.location.href = href,
  key: href,
})

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname()

  const items = links.map<MenuItem>((link) => getLinkItem(link.href, link.label, link.Icon))

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className='flex justify-center'>
        <Image 
          alt='Logo Turma Fit' 
          src='/turma-fit/base/full/base_logo_transparent_background.png' 
          height={90} width={150} 
        />
      </div>
      <Menu theme="dark" defaultSelectedKeys={[pathname]} mode="inline" items={items} />
    </Sider>
  )
}

export default Sidebar