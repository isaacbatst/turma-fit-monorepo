'use client'
import { Drawer } from "antd"
import { useSidebarContext } from "../contexts/SidebarContext"
import LogoutButton from "./LogoutButton"
import SidebarLinks from "./SidebarLinks"




const SidebarMobile = () => {
  const {isOpen, setOpen} = useSidebarContext()

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      placement='left'
      closeIcon
      onClose={onClose}
      open={isOpen}
    >
      <nav className='flex md:hidden md:px-7 flex-col gap-3 text-stone-400'>
        <SidebarLinks onClickLink={() => setOpen(false)} />
        <LogoutButton />
      </nav>
    </Drawer>
  );
}

export default SidebarMobile