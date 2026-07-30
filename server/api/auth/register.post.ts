import { hash } from 'bcryptjs'
import { z } from 'zod'
import { db } from '~~/server/utils/db'
import { users } from '~~/server/utils/schema'
import { eq } from 'drizzle-orm'

const bodySchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse)

  const existingUser = await db.select().from(users).where(eq(users.email, body.email)).get()
  if (existingUser) {
    throw createError({ statusCode: 409, message: 'Un compte avec cet email existe déjà' })
  }

  const existingUsername = await db.select().from(users).where(eq(users.username, body.username)).get()
  if (existingUsername) {
    throw createError({ statusCode: 409, message: 'Ce nom d\'utilisateur est déjà pris' })
  }

  const passwordHash = await hash(body.password, 12)

  const [user] = await db.insert(users).values({
    username: body.username,
    email: body.email,
    passwordHash,
  }).returning()

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
