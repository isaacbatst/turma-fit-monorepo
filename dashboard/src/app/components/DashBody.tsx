import React from 'react'

type Props = {
  children: React.ReactNode
}

const DashBody = (props: Props) => {
  return (
    <section className='flex-1 to-stone-950 from-slate-950 bg-gradient-to-r rounded-tl-[40px] p-2 sm:p-5 lg:p-14'>
      {props.children}
    </section>
  )
}

export default DashBody