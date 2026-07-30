import { db } from '~~/server/utils/db'
import { communityArticles, users } from '~~/server/utils/schema'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user || (session.user.role !== 'admin' && session.user.role !== 'moderator')) {
    throw createError({ statusCode: 403 })
  }

  return await db.select({
    id: communityArticles.id,
    title: communityArticles.title,
    slug: communityArticles.slug,
    content: communityArticles.content,
    status: communityArticles.status,
    rejectionReason: communityArticles.rejectionReason,
    createdAt: communityArticles.createdAt,
    author: { id: users.id, username: users.username },
  }).from(communityArticles)
    .leftJoin(users, eq(communityArticles.authorId, users.id))
    .orderBy(desc(communityArticles.createdAt))
    .all()
})
