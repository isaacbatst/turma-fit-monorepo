'use client' 
import React, { PropsWithChildren } from 'react'
import { Layout } from 'antd'
import Sidebar from './Sidebar'

const { Header, Content, Footer } = Layout

const AntLayout = (props: PropsWithChildren) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content>
          {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Turma Fit ©2023 Created by Isaac Batista</Footer>
      </Layout>
    </Layout>
  )
}

export default AntLayout