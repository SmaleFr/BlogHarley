import { z } from 'zod'
import { db } from '~~/server/utils/db'
import { forumReports } from '~~/server/utils/schema'
import { eq, and } from 'drizzle-orm'
import { deleteForumQuestion, deleteForumAnswer } from '~~/server/utils/forum'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user || (session.user.role !== 'admin' && session.user.role !== 'moderator')) {
    throw createError({ statusCode: 403 })
  }

  const id = parseInt(getRouterParam(event, 'id') || '0')
  if (!id) throw createError({ statusCode: 400 })

  const body = await readValidatedBody(event, z.object({
    action: z.enum(['delete', 'dismiss']),
  }).parse)

  const report = await db.select().from(forumReports).where(eq(forumReports.id, id)).get()
  if (!report) throw createError({ statusCode: 404, message: 'Signalement non trouvé' })

  if (body.action === 'delete') {
    if (report.targetType === 'question') {
      await deleteForumQuestion(report.targetId)
    } else {
      await deleteForumAnswer(report.targetId)
    }
    await db.update(forumReports).set({ status: 'resolved' })
      .where(and(eq(forumReports.targetType, report.targetType), eq(forumReports.targetId, report.targetId)))
      .run()
  } else {
    await db.update(forumReports).set({ status: 'dismissed' }).where(eq(forumReports.id, id)).run()
  }

  return { success: true }
})
