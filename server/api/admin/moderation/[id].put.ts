import { z } from 'zod'
import { db } from '~~/server/utils/db'
import { communityArticles } from '~~/server/utils/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user || (session.user.role !== 'admin' && session.user.role !== 'moderator')) {
    throw createError({ statusCode: 403 })
  }

  const id = parseInt(getRouterParam(event, 'id') || '0')
  if (!id) throw createError({ statusCode: 400 })

  const body = await readValidatedBody(event, z.object({
    status: z.enum(['approved', 'rejected']),
    rejectionReason: z.string().optional(),
  }).parse)

  await db.update(communityArticles).set({
    status: body.status,
    reviewedBy: session.user.id,
    reviewedAt: new Date().toISOString(),
    rejectionReason: body.rejectionReason || null,
  }).where(eq(communityArticles.id, id)).run()

  return { success: true }
})
