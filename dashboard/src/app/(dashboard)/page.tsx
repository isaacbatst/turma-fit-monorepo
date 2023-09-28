import { Card } from "antd";
import Link from "next/link";

export default function Dashboard() {
  return (
    <section className='flex flex-col gap-3 p-5'>
      <h2 className='font-semibold text-xl mb-5'>Bem vindo, Administrador!</h2>
      <Link href='/trainings'>
        <Card className="hover:border-slate-500 flex justify-center">
          <p>Ver meus treinos</p>
        </Card>
      </Link>
    </section>
  );
}
