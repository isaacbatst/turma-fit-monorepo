import React from 'react'

type Props = {
  children: React.ReactNode
}

const DashBody = (props: Props) => {
  return (
    <section className='flex-1 to-yellow-950 from-slate-950 bg-gradient-to-br rounded-tl-[40px] p-14'>
      {props.children}
    </section>
  )
}

export default DashBody