import Link from 'next/link'
import { IconType } from 'react-icons'

type Props = {
  href: string
  label: string
  Icon: IconType
  isActive: boolean
}

const SidebarLink = ({Icon, href, label}: Props) => {
  return (
    <Link href={href} className='flex items-center gap-3'>
      <Icon size={24}  />
      <span>{label}</span>
    </Link>
  )
}

export default SidebarLink