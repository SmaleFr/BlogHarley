import { z } from 'zod'
import slugify from 'slugify'
import { db } from '~~/server/utils/db'
import { forumQuestions } from '~~/server/utils/schema'

const bodySchema = z.object({
  title: z.string().min(5),
  content: z.string().min(10),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user) throw createError({ statusCode: 401, message: 'Authentification requise' })

  const body = await readValidatedBody(event, bodySchema.parse)
  const slug = slugify(body.title, { lower: true, strict: true })

  const [question] = await db.insert(forumQuestions).values({
    title: body.title,
    slug,
    content: body.content,
    authorId: session.user.id,
  }).returning()

  return question
})
