import { z } from 'zod'
import { db } from '~~/server/utils/db'
import { forumAnswers, forumQuestions } from '~~/server/utils/schema'
import { eq } from 'drizzle-orm'

const bodySchema = z.object({
  content: z.string().min(1),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user) throw createError({ statusCode: 401, message: 'Authentification requise' })

  const id = parseInt(getRouterParam(event, 'id') || '0')
  if (!id) throw createError({ statusCode: 400, message: 'ID question requis' })

  const body = await readValidatedBody(event, bodySchema.parse)

  const [answer] = await db.insert(forumAnswers).values({
    content: body.content,
    questionId: id,
    authorId: session.user.id,
  }).returning()

  await db.update(forumQuestions).set({
    answersCount: forumQuestions.answersCount + 1,
  }).where(eq(forumQuestions.id, id)).run()

  return answer
})
