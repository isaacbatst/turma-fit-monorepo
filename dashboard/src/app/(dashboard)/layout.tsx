import { ToastContainer } from "react-toastify"
import AppHeader from "../components/AppHeader"
import DashBody from "../components/DashBody"
import Sidebar from "../components/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="bg-stone-950 min-h-screen flex flex-col">
      <AppHeader />
      <section className="flex flex-1">
        <Sidebar />
        <DashBody>
          {children}
        </DashBody>
      </section>
      <ToastContainer />
    </main>
  )
}