import { auth, currentUser } from '@clerk/nextjs'
import Image from 'next/image'

export default async function Home() {
  const {userId} = auth()
  console.log(userId)
  const user = await currentUser()
  console.log(user)
  return (
    <main>
      <h1>Super app</h1>
      <Image src={user?.imageUrl} width={100} height={100} />
      <Image src={user?.profileImageUrl} width={100} height={100} />
    </main>
  )
}
