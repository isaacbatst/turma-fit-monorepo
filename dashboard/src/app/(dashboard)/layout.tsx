import AppHeader from "../components/AppHeader"
import DashBody from "../components/DashBody"
import Sidebar from "../components/Sidebar"
import ThemeProvider from "../components/ThemeProvider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <main className="bg-slate-950 min-h-screen flex flex-col">
        <AppHeader />
        <section className="flex flex-1">
          <Sidebar />
          <DashBody>
            {children}
          </DashBody>
        </section>
      </main>
    </ThemeProvider>
  )
}