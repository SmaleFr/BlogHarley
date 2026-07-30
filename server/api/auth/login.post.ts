import { compare } from 'bcryptjs'
import { z } from 'zod'
import { db } from '~~/server/utils/db'
import { users } from '~~/server/utils/schema'
import { eq } from 'drizzle-orm'

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse)

  const user = await db.select().from(users).where(eq(users.email, body.email)).get()
  if (!user) {
    throw createError({ statusCode: 401, message: 'Email ou mot de passe incorrect' })
  }

  const valid = await compare(body.password, user.passwordHash)
  if (!valid) {
    throw createError({ statusCode: 401, message: 'Email ou mot de passe incorrect' })
  }

  await setUserSession(event, {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  })

  return { success: true }
})
