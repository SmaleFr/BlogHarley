import { db } from '~~/server/utils/db'
import { forumAnswers, forumQuestions } from '~~/server/utils/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user) throw createError({ statusCode: 401, message: 'Authentification requise' })

  const id = parseInt(getRouterParam(event, 'id') || '0')
  if (!id) throw createError({ statusCode: 400, message: 'ID réponse requis' })

  const answer = await db.select().from(forumAnswers).where(eq(forumAnswers.id, id)).get()
  if (!answer) throw createError({ statusCode: 404, message: 'Réponse non trouvée' })

  const question = await db.select().from(forumQuestions).where(eq(forumQuestions.id, answer.questionId)).get()
  if (!question || question.authorId !== session.user.id) {
    throw createError({ statusCode: 403, message: 'Seul l\'auteur de la question peut accepter une réponse' })
  }

  await db.update(forumAnswers).set({ isAccepted: false }).where(eq(forumAnswers.questionId, answer.questionId)).run()

  await db.update(forumAnswers).set({ isAccepted: true }).where(eq(forumAnswers.id, id)).run()
  await db.update(forumQuestions).set({ acceptedAnswerId: id }).where(eq(forumQuestions.id, answer.questionId)).run()

  return { success: true }
})
