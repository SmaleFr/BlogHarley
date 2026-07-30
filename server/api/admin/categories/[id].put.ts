import { z } from 'zod'
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

  const body = await readValidatedBody(event, z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
    color: z.string().optional(),
  }).parse)

  const updateData: Record<string, any> = {}
  if (body.name) updateData.name = body.name
  if (body.description !== undefined) updateData.description = body.description
  if (body.icon !== undefined) updateData.icon = body.icon
  if (body.color !== undefined) updateData.color = body.color

  await db.update(categories).set(updateData).where(eq(categories.id, id)).run()
  return { success: true }
})
