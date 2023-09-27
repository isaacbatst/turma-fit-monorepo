'use client'
import { PropsWithChildren, createContext, useContext } from "react";
import { ApiGateway } from "../../infra/interfaces/ApiGateway";

type ApiGatewayContextType = {
  apiGateway: ApiGateway
}

const ApiGatewayContext = createContext<ApiGatewayContextType>(null as unknown as ApiGatewayContextType)

type Props = {
  apiGateway: ApiGateway
}

export const ApiGatewayContextProvider = ({children,apiGateway}: PropsWithChildren<Props>) => {
  return <ApiGatewayContext.Provider value={{apiGateway}}>
    {children}
  </ApiGatewayContext.Provider>
}

export const useApiGateway = () => {
  const context = useContext(ApiGatewayContext)

  if(!context) {
    throw new Error('useApiGateway must be used within ApiGatewayContextProvider')
  }

  return context.apiGateway
}