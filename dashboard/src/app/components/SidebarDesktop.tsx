import LogoutButton from './LogoutButton'
import SidebarLinks from './SidebarLinks'

const SidebarDesktop = () => {
  return (
    <nav className='hidden md:flex sm:px-3 pt-10 pb-20
      min-w-[250px]
      flex-col gap-3
    text-stone-400'>
      <SidebarLinks />
      <LogoutButton />
    </nav>
  )
}

export default SidebarDesktop