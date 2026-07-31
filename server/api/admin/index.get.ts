import { db } from '~~/server/utils/db'
import { articles, categories, users, forumQuestions, communityArticles, jobs, forumReports } from '~~/server/utils/schema'
import { eq, count, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user || (session.user.role !== 'admin' && session.user.role !== 'moderator')) {
    throw createError({ statusCode: 403 })
  }

  const [articlesCount] = await db.select({ count: count() }).from(articles).all()
  const [questionsCount] = await db.select({ count: count() }).from(forumQuestions).all()
  const [pendingCommunity] = await db.select({ count: count() }).from(communityArticles).where(eq(communityArticles.status, 'pending')).all()
  const [pendingJobs] = await db.select({ count: count() }).from(jobs).where(eq(jobs.approved, false)).all()
  const [pendingReports] = await db.select({ count: count() }).from(forumReports).where(eq(forumReports.status, 'pending')).all()

  return {
    articles: articlesCount.count,
    questions: questionsCount.count,
    pendingCommunity: pendingCommunity.count,
    pendingJobs: pendingJobs.count,
    pendingReports: pendingReports.count,
  }
})
