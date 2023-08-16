import React from 'react'

type Props = {
  children: React.ReactNode
}

const DashBody = (props: Props) => {
  return (
    <section className='flex-1 bg-stone-900 rounded-tl-[40px] p-14'>
      {props.children}
    </section>
  )
}

export default DashBody