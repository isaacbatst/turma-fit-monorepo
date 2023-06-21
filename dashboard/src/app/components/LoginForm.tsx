import React from 'react'

type Props = {}

const LoginForm = (props: Props) => {
  return (
    <form className="flex flex-col gap-10">
      <div className=''>
        <h2 className='text-4xl font-semibold mb-2'>Dashboard TurmaFit</h2>
        <p className="text-sm text-stone-950 opacity-50">Acesse o dashboard da administração</p>
      </div>
      <div className='flex flex-col gap-3'>
        <div className="flex flex-col">
          <label className="text-sm mb-1 font-semibold" htmlFor="login-email">E-mail</label>
          <input type="text" name="login-email" id="login-email" 
            className='bg-transparent text-stone-950 
          py-2 px-3 outline-none shadow-md rounded-lg
          focus:border-stone-600' 
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-1 font-semibold" htmlFor="login-password">Senha</label>
          <input type="password" name="login-password" id="login-password" 
            className='bg-transparent text-stone-950 
            py-2 px-3 outline-none shadow-md rounded-lg
            focus:border-stone-600' />
        </div>
      </div>
      <button type="submit" 
        className="from-yellow-400 to-amber-500 bg-gradient-to-r 
          hover:scale-105 active:scale-110 transition 
          text-white font-semibold py-3 px-4 rounded-xl"
      >
        Entrar
      </button>
    </form>
  )
}

export default LoginForm