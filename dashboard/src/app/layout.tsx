import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import StyledComponentsRegistry from '../lib/AntdRegistry';
import { Inter } from 'next/font/google'

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
  console.log('front ou back')
  return (
    <html lang="en" className={`${inter.className} ${inter.variable}`}>
      <body>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
