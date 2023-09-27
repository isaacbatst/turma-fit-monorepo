'use client'
import { ConfigProvider, theme } from 'antd'
import React, { PropsWithChildren } from 'react'

const ThemeProvider = (props: PropsWithChildren) => {
  return (
    <ConfigProvider theme={{
      algorithm: theme.darkAlgorithm,
      token: {
        fontFamily: 'inherit',
      },
    }}>
      {props.children}
    </ConfigProvider>
  )
}

export default ThemeProvider