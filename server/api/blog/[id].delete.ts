import { db } from '~~/server/utils/db'
import { articles } from '~~/server/utils/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user || session.user.role !== 'admin') {
    throw createError({ statusCode: 403, message: 'Accès refusé' })
  }

  const id = parseInt(getRouterParam(event, 'id') || '0')
  if (!id) throw createError({ statusCode: 400, message: 'ID requis' })

  await db.delete(articles).where(eq(articles.id, id))
  return { success: true }
})
