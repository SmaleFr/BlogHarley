import { z } from 'zod'
import slugify from 'slugify'
import { db } from '~~/server/utils/db'
import { articles } from '~~/server/utils/schema'
import { eq } from 'drizzle-orm'

const bodySchema = z.object({
  title: z.string().min(3).optional(),
  content: z.string().min(10).optional(),
  excerpt: z.string().optional(),
  categoryId: z.number().optional(),
  published: z.boolean().optional(),
  featuredImage: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user || (session.user.role !== 'admin' && session.user.role !== 'moderator')) {
    throw createError({ statusCode: 403, message: 'Accès refusé' })
  }

  const id = parseInt(getRouterParam(event, 'id') || '0')
  if (!id) throw createError({ statusCode: 400, message: 'ID requis' })

  const body = await readValidatedBody(event, bodySchema.parse)
  const updateData: Record<string, any> = {}

  if (body.title) {
    updateData.title = body.title
    updateData.slug = slugify(body.title, { lower: true, strict: true })
  }
  if (body.content) {
    updateData.content = body.content
    updateData.readingTime = Math.max(1, Math.ceil(body.content.split(/\s+/).length / 200))
  }
  if (body.excerpt !== undefined) updateData.excerpt = body.excerpt
  if (body.categoryId !== undefined) updateData.categoryId = body.categoryId
  if (body.featuredImage !== undefined) updateData.featuredImage = body.featuredImage
  if (body.published !== undefined) {
    updateData.published = body.published
    if (body.published) updateData.publishedAt = new Date().toISOString()
  }
  updateData.updatedAt = new Date().toISOString()

  const [article] = await db.update(articles).set(updateData).where(eq(articles.id, id)).returning()
  return article
})
