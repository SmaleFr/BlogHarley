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
    role: z.enum(['admin', 'moderator', 'user']).optional(),
    active: z.boolean().optional(),
  }).parse)

  if (body.active === false && id === session.user.id) {
    throw createError({ statusCode: 400, message: 'Vous ne pouvez pas désactiver votre propre compte' })
  }

  const updateData: Record<string, any> = {}
  if (body.role !== undefined) updateData.role = body.role
  if (body.active !== undefined) updateData.active = body.active

  await db.update(users).set(updateData).where(eq(users.id, id)).run()
  return { success: true }
})
