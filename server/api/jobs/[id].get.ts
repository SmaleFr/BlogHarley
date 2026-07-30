import { db } from '~~/server/utils/db'
import { jobs, users } from '~~/server/utils/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0')
  if (!id) throw createError({ statusCode: 400, message: 'ID requis' })

  const job = await db.select({
    id: jobs.id,
    title: jobs.title,
    company: jobs.company,
    location: jobs.location,
    type: jobs.type,
    description: jobs.description,
    contactEmail: jobs.contactEmail,
    salaryRange: jobs.salaryRange,
    companyWebsite: jobs.companyWebsite,
    applyUrl: jobs.applyUrl,
    createdAt: jobs.createdAt,
    postedBy: { id: users.id, username: users.username },
  }).from(jobs)
    .leftJoin(users, eq(jobs.postedById, users.id))
    .where(eq(jobs.id, id))
    .get()

  if (!job) throw createError({ statusCode: 404, message: 'Offre non trouvée' })

  return job
})
