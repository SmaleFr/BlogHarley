import { z } from 'zod'
import slugify from 'slugify'
import { db } from '~~/server/utils/db'
import { communityArticles } from '~~/server/utils/schema'

const bodySchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  excerpt: z.string().optional(),
  categoryId: z.number().optional(),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user) throw createError({ statusCode: 401, message: 'Authentification requise' })

  const body = await readValidatedBody(event, bodySchema.parse)
  const slug = slugify(body.title, { lower: true, strict: true })

  const [article] = await db.insert(communityArticles).values({
    title: body.title,
    slug,
    content: body.content,
    excerpt: body.excerpt || body.content.substring(0, 200),
    categoryId: body.categoryId,
    authorId: session.user.id,
  }).returning()

  return article
})
