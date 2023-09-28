import Link from 'next/link'
import { IconType } from 'react-icons'

type Props = {
  href: string
  label: string
  Icon: IconType
  isActive: boolean
  isCollapsed?: boolean
  onClick?: () => void
}

const SidebarLink = ({Icon, href, label, isActive, isCollapsed = false, onClick}: Props) => {
  const linkActiveClasses = 'text-white bg-slate-800';
  const iconClasses = isActive ? 'text-yellow-300' : 'text-stone-400'

  return (
    <Link 
      className={`${isActive ? `${linkActiveClasses}` : ''} 
      flex gap-3 items-center p-3 text-white rounded-md hover:bg-stone-700 hover:text-white
      `} href={href}
      onClick={onClick}>
      <Icon size={24} className={iconClasses} />
      <span>{label}</span>
    </Link>
  )
}

export default SidebarLink