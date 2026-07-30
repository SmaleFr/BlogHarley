import { z } from 'zod'
import { db } from '~~/server/utils/db'
import { users } from '~~/server/utils/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user || session.user.role !== 'admin') {
    throw createError({ statusCode: 403 })
  }

  const id = parseInt(getRouterParam(event, 'id') || '0')
  if (!id) throw createError({ statusCode: 400 })

  const body = await readValidatedBody(event, z.object({
    role: z.enum(['admin', 'moderator', 'user']),
  }).parse)

  await db.update(users).set({ role: body.role }).where(eq(users.id, id)).run()
  return { success: true }
})
