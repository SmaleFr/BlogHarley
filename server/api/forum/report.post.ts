import { z } from 'zod'
import { db } from '~~/server/utils/db'
import { forumReports, forumQuestions, forumAnswers } from '~~/server/utils/schema'
import { eq } from 'drizzle-orm'

const bodySchema = z.object({
  targetType: z.enum(['question', 'answer']),
  targetId: z.number(),
  reason: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user) throw createError({ statusCode: 401, message: 'Authentification requise' })

  const body = await readValidatedBody(event, bodySchema.parse)

  const table = body.targetType === 'question' ? forumQuestions : forumAnswers
  const exists = await db.select({ id: table.id }).from(table).where(eq(table.id, body.targetId)).get()
  if (!exists) throw createError({ statusCode: 404, message: 'Contenu introuvable' })

  await db.insert(forumReports).values({
    targetType: body.targetType,
    targetId: body.targetId,
    reporterId: session.user.id,
    reason: body.reason,
  }).run()

  return { success: true }
})
