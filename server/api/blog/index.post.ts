import { z } from 'zod'
import slugify from 'slugify'
import { db } from '~~/server/utils/db'
import { articles } from '~~/server/utils/schema'
import { eq } from 'drizzle-orm'

const bodySchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  excerpt: z.string().optional(),
  categoryId: z.number().optional(),
  published: z.boolean().default(false),
  featuredImage: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user || (session.user.role !== 'admin' && session.user.role !== 'moderator')) {
    throw createError({ statusCode: 403, message: 'Accès refusé' })
  }

  const body = await readValidatedBody(event, bodySchema.parse)
  const slug = slugify(body.title, { lower: true, strict: true })
  const readingTime = Math.max(1, Math.ceil(body.content.split(/\s+/).length / 200))

  const [article] = await db.insert(articles).values({
    title: body.title,
    slug,
    content: body.content,
    excerpt: body.excerpt || body.content.substring(0, 200),
    categoryId: body.categoryId,
    authorId: session.user.id,
    featuredImage: body.featuredImage,
    published: body.published,
    publishedAt: body.published ? new Date().toISOString() : null,
    readingTime,
  }).returning()

  return article
})
