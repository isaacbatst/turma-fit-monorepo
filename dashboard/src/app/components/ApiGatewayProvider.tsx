'use client'

import React, { PropsWithChildren } from 'react'
import { ApiGatewayContextProvider } from './ApiGatewayContext'
import { ApiGatewayAxios } from '../../infra/impl/ApiGatewayAxios'

const apiGateway = new ApiGatewayAxios()

const ApiGatewayProvider = ({children}: PropsWithChildren) => {
  return <ApiGatewayContextProvider apiGateway={apiGateway}>
    {children}
  </ApiGatewayContextProvider>
}

export default ApiGatewayProvider