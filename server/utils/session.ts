import { db } from '~~/server/utils/db'
import { users } from '~~/server/utils/schema'
import { eq } from 'drizzle-orm'

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
  const data = session.data as { user?: SessionUser }

  if (data.user) {
    const dbUser = await db.select({ active: users.active }).from(users).where(eq(users.id, data.user.id)).get()
    if (!dbUser || !dbUser.active) {
      await session.clear()
      return { user: undefined }
    }
  }

  return data
}

export async function clearUserSession(event: any) {
  const session = await useSession(event, {
    password: process.env.NUXT_SESSION_SECRET || 'dev-secret-key-change-in-production-blog-harley-2024',
    maxAge: 60 * 60 * 24 * 7,
  })
  await session.clear()
}
