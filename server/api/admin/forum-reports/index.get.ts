import { db } from '~~/server/utils/db'
import { forumReports, forumQuestions, forumAnswers, users } from '~~/server/utils/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user || (session.user.role !== 'admin' && session.user.role !== 'moderator')) {
    throw createError({ statusCode: 403 })
  }

  const reports = await db.select({
    id: forumReports.id,
    targetType: forumReports.targetType,
    targetId: forumReports.targetId,
    reason: forumReports.reason,
    createdAt: forumReports.createdAt,
    reporter: { id: users.id, username: users.username },
  }).from(forumReports)
    .leftJoin(users, eq(forumReports.reporterId, users.id))
    .where(eq(forumReports.status, 'pending'))
    .orderBy(forumReports.createdAt)
    .all()

  const enriched = await Promise.all(reports.map(async (report) => {
    if (report.targetType === 'question') {
      const question = await db.select({
        title: forumQuestions.title,
        slug: forumQuestions.slug,
        content: forumQuestions.content,
        authorId: forumQuestions.authorId,
      }).from(forumQuestions).where(eq(forumQuestions.id, report.targetId)).get()
      return { ...report, target: question || null }
    }

    const answer = await db.select({
      content: forumAnswers.content,
      questionId: forumAnswers.questionId,
      authorId: forumAnswers.authorId,
    }).from(forumAnswers).where(eq(forumAnswers.id, report.targetId)).get()

    if (!answer) return { ...report, target: null }

    const question = await db.select({ slug: forumQuestions.slug, title: forumQuestions.title })
      .from(forumQuestions).where(eq(forumQuestions.id, answer.questionId)).get()

    return { ...report, target: { ...answer, questionSlug: question?.slug, questionTitle: question?.title } }
  }))

  return enriched
})
