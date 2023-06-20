import React from 'react'

type Props = {}

const LoginForm = (props: Props) => {
  return (
    <form className="py-10 px-24 rounded-2xl shadow-lg flex flex-col gap-5">
      <div className="mb-1">
        <h2 className='text-2xl font-medium mb-1'>Dashboard da TurmaFit</h2>
        <p className="text-sm text-stone-950 opacity-50">Acesse o dashboard da administração</p>
      </div>
      <div className="flex flex-col">
        <label className="text-sm mb-1" htmlFor="login-email">E-mail</label>
        <input type="text" name="login-email" id="login-email" 
          className='bg-transparent text-stone-950 py-2 px-3 outline-none border-2 border-stone-200 rounded-lg
                focus:border-stone-600' />
      </div>
      <div className="flex flex-col">
        <label className="text-sm mb-1" htmlFor="login-password">Senha</label>
        <input type="password" name="login-password" id="login-password" 
          className='bg-transparent text-stone-950 py-2 px-3 outline-none border-2 border-stone-200 rounded-lg
              focus:border-stone-600' />
      </div>
      <button type="submit" 
        className="bg-stone-900 hover:scale-105 active:scale-110 transition 
              text-white py-3 px-4 rounded-lg">
        Entrar
      </button>
    </form>
  )
}

export default LoginForm