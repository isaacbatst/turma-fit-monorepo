import AppHeader from "./components/AppHeader";
import DashBody from "./components/DashBody";
import Sidebar from "./components/Sidebar";

export default function Dashboard() {
  return (
    <main className="bg-slate-950 min-h-screen flex flex-col">
      <AppHeader />
      <section className="flex flex-1">
        <Sidebar />
        <DashBody>
          <h2 className='font-semibold text-xl mb-5'>Bem vindo, Administrador!</h2>
          <p>Use o menu lateral para começar a brincadeira.</p>
        </DashBody>
      </section>
    </main>
  );
}
