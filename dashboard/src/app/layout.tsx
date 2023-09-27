import { Inter } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import StyledComponentsRegistry from '../lib/AntdRegistry';
import ApiGatewayProvider from './components/ApiGatewayProvider';
import './globals.css';
import { ToastContainer } from 'react-toastify';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata = {
  title: 'Dashboard Turma Fit',
  description: 'Gerencie seus usuários e treinos.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.className} ${inter.variable}`}>
      <body>
        <ApiGatewayProvider>
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </ApiGatewayProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
