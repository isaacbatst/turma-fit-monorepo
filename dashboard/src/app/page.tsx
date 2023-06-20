import Image from "next/image";
import LoginForm from "./components/LoginForm";

export default function Home() {
  return (
    <main className="bg-white text-stone-950">
      <div className="min-h-screen flex">
        <div className="flex-1 flex justify-center items-center">
          <LoginForm />
        </div>
        <div className="hidden lg:block flex-1">
          <Image className="h-full object-cover" src="/login-bg.jpg" alt="workout" width={1920} height={1080} />
        </div>
      </div>
    </main>
  )
}
