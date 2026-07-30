import { db } from '~~/server/utils/db'
import { categories } from '~~/server/utils/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user || session.user.role !== 'admin') {
    throw createError({ statusCode: 403 })
  }

  const id = parseInt(getRouterParam(event, 'id') || '0')
  if (!id) throw createError({ statusCode: 400 })

  await db.delete(categories).where(eq(categories.id, id)).run()
  return { success: true }
})
