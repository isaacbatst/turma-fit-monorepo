import React, { PropsWithChildren } from 'react'

const SectionTitle = ({children}: PropsWithChildren) => {
  return (
    <h2 className="text-center text-3xl font-medium mb-16">{children}</h2>
  )
}

export default SectionTitle