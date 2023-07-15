import Link from 'next/link'
import { IconType } from 'react-icons'

type Props = {
  href: string
  label: string
  Icon: IconType
  isActive: boolean
}

const SidebarLink = ({Icon, href, label, isActive}: Props) => {
  const linkDefaultClasses = 'flex gap-3 items-center p-3 rounded-md hover:bg-stone-700 hover:text-white'
  const linkActiveClasses = 'text-white bg-stone-800';
  const linkClasses = isActive ? `${linkDefaultClasses} ${linkActiveClasses}` : linkDefaultClasses;
  const iconClasses = isActive ? 'text-yellow-300' : 'text-stone-400'

  return (
    <Link className={linkClasses} href={href}>
      <Icon size={24} className={iconClasses} />
      <span>{label}</span>
    </Link>
  )
}

export default SidebarLink