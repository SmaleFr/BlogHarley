import { db } from '~~/server/utils/db'
import { jobs, users } from '~~/server/utils/schema'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user || (session.user.role !== 'admin' && session.user.role !== 'moderator')) {
    throw createError({ statusCode: 403 })
  }

  return await db.select({
    id: jobs.id,
    title: jobs.title,
    company: jobs.company,
    type: jobs.type,
    approved: jobs.approved,
    createdAt: jobs.createdAt,
    postedBy: { id: users.id, username: users.username },
  }).from(jobs)
    .leftJoin(users, eq(jobs.postedById, users.id))
    .orderBy(desc(jobs.createdAt))
    .all()
})
