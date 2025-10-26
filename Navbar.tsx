import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar(){
  const { data: session } = useSession()
  return (
    <nav className="w-full p-4 border-b border-gray-800 bg-black text-white">
      <div className="container flex items-center justify-between">
        <Link href="/"><span className="text-2xl font-bold">Joyfashion</span></Link>
        <div className="flex gap-4 items-center">
          <Link href="/catalog">Catálogo</Link>
          {session ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <button onClick={() => signOut()} className="px-3 py-1 btn-gold">Sair</button>
            </>
          ) : (
            <Link href="/auth/login">Entrar</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
