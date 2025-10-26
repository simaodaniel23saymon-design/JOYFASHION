import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('CUSTOMER')
  const router = useRouter()

  async function handle(e:any) {
    e.preventDefault()
    try {
      await axios.post('/api/register', { name, email, password, role })
      alert('Conta criada. Faz login.')
      router.push('/auth/login')
    } catch(err:any) {
      alert(err.response?.data?.error || 'Erro')
    }
  }

  return (
    <div className="container p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Registar</h1>
      <form onSubmit={handle} className="flex flex-col gap-2 mt-4">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nome" className="p-2 rounded"/>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="p-2 rounded"/>
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Senha" type="password" className="p-2 rounded"/>
        <label className="mt-2">Tipo de conta:</label>
        <select value={role} onChange={e=>setRole(e.target.value)} className="p-2 rounded">
          <option value="CUSTOMER">Cliente</option>
          <option value="VENDOR">Vendedor</option>
          <option value="MODEL">Modelo</option>
        </select>
        <button className="btn-gold mt-2" type="submit">Registar</button>
      </form>
    </div>
  )
}
