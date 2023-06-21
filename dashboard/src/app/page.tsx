import LoginForm from "./components/LoginForm";

export default function Home() {
  return (
    <main className="bg-white text-stone-950">
      <div className="min-h-screen flex flex-col">
        <div
          className="py-10 
          shadow-lg gap-5 bg-white
          flex-1
          w-full px-5 
          flex items-center justify-center
          "
        >
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
