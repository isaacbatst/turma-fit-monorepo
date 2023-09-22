import React from 'react'

type Props = {
  children: React.ReactNode
}

const DashBody = (props: Props) => {
  return (
    <section className='flex-1 from-slate-900 to-slate-950 bg-gradient-to-r rounded-tl-[40px] p-14'>
      {props.children}
    </section>
  )
}

export default DashBody