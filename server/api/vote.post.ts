import { z } from 'zod'
import { db } from '~~/server/utils/db'
import { votes, forumQuestions, forumAnswers, users } from '~~/server/utils/schema'
import { eq, and } from 'drizzle-orm'

const bodySchema = z.object({
  targetType: z.enum(['question', 'answer']),
  targetId: z.number(),
  value: z.union([z.literal(1), z.literal(-1)]),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user) throw createError({ statusCode: 401, message: 'Authentification requise' })

  const body = await readValidatedBody(event, bodySchema.parse)

  const existing = await db.select().from(votes).where(
    and(eq(votes.userId, session.user.id), eq(votes.targetType, body.targetType), eq(votes.targetId, body.targetId))
  ).get()

  if (existing) {
    if (existing.value === body.value) {
      await db.delete(votes).where(eq(votes.id, existing.id)).run()
      const delta = -body.value
      if (body.targetType === 'question') {
        await db.update(forumQuestions).set({ votes: forumQuestions.votes + delta }).where(eq(forumQuestions.id, body.targetId)).run()
      } else {
        await db.update(forumAnswers).set({ votes: forumAnswers.votes + delta }).where(eq(forumAnswers.id, body.targetId)).run()
      }
      return { action: 'removed' }
    }
    await db.update(votes).set({ value: body.value }).where(eq(votes.id, existing.id)).run()
    const delta = body.value * 2
    if (body.targetType === 'question') {
      await db.update(forumQuestions).set({ votes: forumQuestions.votes + delta }).where(eq(forumQuestions.id, body.targetId)).run()
    } else {
      await db.update(forumAnswers).set({ votes: forumAnswers.votes + delta }).where(eq(forumAnswers.id, body.targetId)).run()
    }
    return { action: 'updated' }
  }

  await db.insert(votes).values({
    userId: session.user.id,
    targetType: body.targetType,
    targetId: body.targetId,
    value: body.value,
  }).run()

  if (body.targetType === 'question') {
    await db.update(forumQuestions).set({ votes: forumQuestions.votes + body.value }).where(eq(forumQuestions.id, body.targetId)).run()
  } else {
    await db.update(forumAnswers).set({ votes: forumAnswers.votes + body.value }).where(eq(forumAnswers.id, body.targetId)).run()
  }

  return { action: 'created' }
})
