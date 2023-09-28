'use client'
import { Drawer } from "antd"
import { usePathname } from "next/navigation"
import { AiOutlineHome } from "react-icons/ai"
import { BiSpreadsheet } from "react-icons/bi"
import { CgGym } from "react-icons/cg"
import { GiMuscleUp } from "react-icons/gi"
import { MdSportsGymnastics } from "react-icons/md"
import { useSidebarContext } from "../contexts/SidebarContext"
import LogoutButton from "./LogoutButton"
import SidebarLink from "./SidebarLink"

const links = [
  { href: '/', label: 'Início', Icon: AiOutlineHome },
  // { href: '/users', label: 'Usuários', Icon: AiOutlineUser },
  // { href: '/admins', label: 'Administradores', Icon: RiAdminLine },
  { href: '/muscles', label: 'Músculos', Icon: GiMuscleUp },
  { href: '/equipments', label: 'Equipamentos', Icon: CgGym },
  { href: '/moviments', label: 'Movimentos', Icon: MdSportsGymnastics },
  { href: '/trainings', label: 'Treinos ', Icon: BiSpreadsheet },
]


const SidebarMobile = () => {
  const {isOpen, setOpen} = useSidebarContext()

  const onClose = () => {
    setOpen(false);
  };
  const pathname = usePathname()


  return (
    <Drawer
      placement='left'
      closeIcon
      onClose={onClose}
      open={isOpen}
    >
      <nav className='flex sm:hidden sm:px-7 flex-col gap-3 text-stone-400'>
        {links.map(({ href, label, Icon }) => (
          <SidebarLink key={href} 
            onClick={() => setOpen(false)}
            href={href} label={label} Icon={Icon} isActive={href === pathname} 
          />
        ))}
        <LogoutButton />
      </nav>
    </Drawer>
  );
}

export default SidebarMobile