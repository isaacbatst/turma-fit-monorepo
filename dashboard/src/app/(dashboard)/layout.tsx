import AppHeader from "../components/AppHeader"
import DashBody from "../components/DashBody"
import Sidebar from "../components/Sidebar"
import SidebarMobile from "../components/SidebarMobile"
import ThemeProvider from "../components/ThemeProvider"
import { SidebarContextProvider } from "../contexts/SidebarContext"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <SidebarContextProvider>
        <main className="bg-slate-950 min-h-screen flex flex-col">
          <AppHeader />
          <section className="flex flex-1">
            <Sidebar />
            <SidebarMobile />
            <DashBody>
              {children}
            </DashBody>
          </section>
        </main>
      </SidebarContextProvider>
    </ThemeProvider>
  )
}