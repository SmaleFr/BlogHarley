import { z } from 'zod'
import { db } from '~~/server/utils/db'
import { jobs } from '~~/server/utils/schema'

const bodySchema = z.object({
  title: z.string().min(3),
  company: z.string().min(1),
  location: z.string().optional(),
  type: z.enum(['CDI', 'CDD', 'Freelance', 'Stage', 'Prestation']),
  description: z.string().min(10),
  contactEmail: z.string().email().optional(),
  salaryRange: z.string().optional(),
  companyWebsite: z.string().optional(),
  applyUrl: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user) throw createError({ statusCode: 401, message: 'Authentification requise' })

  const body = await readValidatedBody(event, bodySchema.parse)

  const [job] = await db.insert(jobs).values({
    title: body.title,
    company: body.company,
    location: body.location,
    type: body.type,
    description: body.description,
    contactEmail: body.contactEmail,
    salaryRange: body.salaryRange,
    companyWebsite: body.companyWebsite,
    applyUrl: body.applyUrl,
    postedById: session.user.id,
  }).returning()

  return job
})
