import { z } from 'zod'
import slugify from 'slugify'
import { db } from '~~/server/utils/db'
import { categories } from '~~/server/utils/schema'
import { eq } from 'drizzle-orm'

const bodySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user || session.user.role !== 'admin') {
    throw createError({ statusCode: 403 })
  }

  const body = await readValidatedBody(event, bodySchema.parse)
  const slug = slugify(body.name, { lower: true, strict: true })

  const [cat] = await db.insert(categories).values({
    name: body.name,
    slug,
    description: body.description,
    icon: body.icon,
    color: body.color || '#ff6600',
  }).returning()

  return cat
})
