import { z } from 'zod'
import { db } from '~~/server/utils/db'
import { jobs } from '~~/server/utils/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user || (session.user.role !== 'admin' && session.user.role !== 'moderator')) {
    throw createError({ statusCode: 403 })
  }

  const id = parseInt(getRouterParam(event, 'id') || '0')
  if (!id) throw createError({ statusCode: 400 })

  const body = await readValidatedBody(event, z.object({
    approved: z.boolean(),
  }).parse)

  await db.update(jobs).set({ approved: body.approved }).where(eq(jobs.id, id)).run()
  return { success: true }
})
