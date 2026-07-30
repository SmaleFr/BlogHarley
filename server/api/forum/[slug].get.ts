import { db } from '~~/server/utils/db'
import { forumQuestions, forumAnswers, users } from '~~/server/utils/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 400, message: 'Slug requis' })

  const question = await db.select({
    id: forumQuestions.id,
    title: forumQuestions.title,
    slug: forumQuestions.slug,
    content: forumQuestions.content,
    views: forumQuestions.views,
    votes: forumQuestions.votes,
    answersCount: forumQuestions.answersCount,
    acceptedAnswerId: forumQuestions.acceptedAnswerId,
    createdAt: forumQuestions.createdAt,
    author: { id: users.id, username: users.username, avatar: users.avatar },
  }).from(forumQuestions)
    .leftJoin(users, eq(forumQuestions.authorId, users.id))
    .where(eq(forumQuestions.slug, slug))
    .get()

  if (!question) throw createError({ statusCode: 404, message: 'Question non trouvée' })

  await db.update(forumQuestions).set({ views: forumQuestions.views + 1 }).where(eq(forumQuestions.slug, slug)).run()

  const answers = await db.select({
    id: forumAnswers.id,
    content: forumAnswers.content,
    votes: forumAnswers.votes,
    isAccepted: forumAnswers.isAccepted,
    createdAt: forumAnswers.createdAt,
    author: { id: users.id, username: users.username, avatar: users.avatar },
  }).from(forumAnswers)
    .leftJoin(users, eq(forumAnswers.authorId, users.id))
    .where(eq(forumAnswers.questionId, question.id))
    .orderBy(forumAnswers.votes)
    .all()

  return { ...question, answers }
})
