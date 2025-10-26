import { getSession } from 'next-auth/react'
import { prisma } from '../../lib/prisma'

export default function Dashboard({ user, products }: any) {
  return (
    <div className="container p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Bem-vindo, {user?.name || user?.email}</p>
      <p>Função: {user?.role}</p>
      {user?.role === 'VENDOR' && (
        <div className="mt-4">
          <h2 className="font-semibold">Seus Produtos</h2>
          <ul>
            {products.map((p:any)=> <li key={p.id}>{p.title}</li>)}
          </ul>
        </div>
      )}
      {user?.role === 'MODEL' && (
        <div className="mt-4">
          <h2 className="font-semibold">Perfil de Modelo</h2>
          <p>Aqui podes gerir o teu perfil de modelo.</p>
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps(ctx:any) {
  const session = await getSession(ctx)
  if (!session) return { redirect: { destination: '/auth/login', permanent: false } }
  const user = await prisma.user.findUnique({ where: { email: session.user?.email } })
  const products = user?.role === 'VENDOR' ? await prisma.product.findMany({ where: { vendorId: user.id } }) : []
  return { props: { user, products } }
}
