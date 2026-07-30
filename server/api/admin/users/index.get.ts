import { db } from '~~/server/utils/db'
import { users } from '~~/server/utils/schema'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user || session.user.role !== 'admin') {
    throw createError({ statusCode: 403 })
  }

  return await db.select({
    id: users.id,
    username: users.username,
    email: users.email,
    role: users.role,
    reputation: users.reputation,
    createdAt: users.createdAt,
  }).from(users).orderBy(desc(users.createdAt)).all()
})
