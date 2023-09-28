import AntLayout from "../components/AntLayout";
import ThemeProvider from "../components/ThemeProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      {/* <AppHeader /> */}
      <AntLayout>
        {children}
      </AntLayout>
    </ThemeProvider>
  )
}
