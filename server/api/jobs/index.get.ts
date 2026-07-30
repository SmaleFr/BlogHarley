import { db } from '~~/server/utils/db'
import { jobs, users } from '~~/server/utils/schema'
import { eq, desc, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const conditions = [eq(jobs.approved, true)]

  if (query.type) conditions.push(eq(jobs.type, query.type as string))

  return await db.select({
    id: jobs.id,
    title: jobs.title,
    company: jobs.company,
    location: jobs.location,
    type: jobs.type,
    description: jobs.description,
    salaryRange: jobs.salaryRange,
    companyWebsite: jobs.companyWebsite,
    applyUrl: jobs.applyUrl,
    createdAt: jobs.createdAt,
    postedBy: { id: users.id, username: users.username },
  }).from(jobs)
    .leftJoin(users, eq(jobs.postedById, users.id))
    .where(and(...conditions))
    .orderBy(desc(jobs.createdAt))
    .all()
})
