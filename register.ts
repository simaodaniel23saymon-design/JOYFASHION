import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'
import bcrypt from 'bcryptjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { name, email, password, role } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' })
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return res.status(400).json({ error: 'User exists' })
  const hashed = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({ data: { name, email, password: hashed, role: role || 'CUSTOMER' } })
  res.json({ ok: true, user: { id: user.id, email: user.email } })
}
