export interface SessionUser {
  id: number
  username: string
  email: string
  role: 'admin' | 'moderator' | 'user'
  avatar: string | null
}

export async function setUserSession(event: any, data: { user: SessionUser }) {
  const session = await useSession(event, {
    password: process.env.NUXT_SESSION_SECRET || 'dev-secret-key-change-in-production-blog-harley-2024',
    maxAge: 60 * 60 * 24 * 7,
  })
  await session.update(data)
  return session
}

export async function getUserSession(event: any) {
  const session = await useSession(event, {
    password: process.env.NUXT_SESSION_SECRET || 'dev-secret-key-change-in-production-blog-harley-2024',
    maxAge: 60 * 60 * 24 * 7,
  })
  return session.data as { user?: SessionUser }
}

export async function clearUserSession(event: any) {
  const session = await useSession(event, {
    password: process.env.NUXT_SESSION_SECRET || 'dev-secret-key-change-in-production-blog-harley-2024',
    maxAge: 60 * 60 * 24 * 7,
  })
  await session.clear()
}
