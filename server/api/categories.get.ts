import { db } from '~~/server/utils/db'
import { categories } from '~~/server/utils/schema'

export default defineEventHandler(async () => {
  return await db.select().from(categories).all()
})
