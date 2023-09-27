'use client'
import { MouseEventHandler, useState } from 'react'
import { useApiGateway } from '../components/ApiGatewayContext'
import { LoginErrorHandler } from './LoginErrorHandler'

const errorHandler = new LoginErrorHandler()

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const apiGateway = useApiGateway()
  
  const onSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      e.preventDefault()
      await apiGateway.auth.login(email, password)
      window.location.href = '/'
    } catch(err) {
      const message = errorHandler.getMessage(err)
      errorHandler.showToast(message)
    }
  }

  return (
    <form className="flex flex-col gap-10" >
      <div className=''>
        <h2 className='text-4xl font-semibold mb-2'>Dashboard TurmaFit</h2>
        <p className="text-sm text-stone-950 opacity-50">Acesse o dashboard da administração</p>
      </div>
      <div className='flex flex-col gap-3'>
        <div className="flex flex-col">
          <label className="text-sm mb-1 font-semibold" htmlFor="login-email">E-mail</label>
          <input type="text" name="login-email" id="login-email" 
            value={email} onChange={e => setEmail(e.target.value)}
            className='bg-transparent text-stone-950 
            py-2 px-3 outline-none shadow-md rounded-lg
            focus:ring-2 focus:ring-stone-60' 
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-1 font-semibold" htmlFor="login-password">Senha</label>
          <input type="password" name="login-password" id="login-password" 
            value={password} onChange={e => setPassword(e.target.value)}
            className='bg-transparent text-stone-950 
            py-2 px-3 outline-none shadow-md rounded-lg
            focus:ring-2 focus:ring-stone-60' 
          />
        </div>
      </div>
      <button type="submit" 
        onClick={onSubmit}
        className="from-yellow-400 to-amber-500 bg-gradient-to-r  shadow-md
          hover:opacity-80
          active:scale-105 transition 
          text-white font-semibold py-3 px-4 rounded-xl"
      >
        Entrar
      </button>
    </form>
  )
}

export default LoginForm