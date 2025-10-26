import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handle(e:any) {
    e.preventDefault()
    const res = await signIn('credentials', { redirect: false, email, password })
    if (res?.ok) router.push('/dashboard')
    else alert('Credenciais inválidas')
  }

  return (
    <div className="container p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Entrar</h1>
      <form onSubmit={handle} className="flex flex-col gap-2 mt-4">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="p-2 rounded"/>
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Senha" type="password" className="p-2 rounded"/>
        <button className="btn-gold mt-2" type="submit">Entrar</button>
      </form>
      <p className="mt-4">Não tens conta? <a href="/auth/register" className="underline">Registar</a></p>
    </div>
  )
}
