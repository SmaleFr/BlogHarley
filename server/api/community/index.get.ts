import { db } from '~~/server/utils/db'
import { communityArticles, categories, users } from '~~/server/utils/schema'
import { eq, desc, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  return await db.select({
    id: communityArticles.id,
    title: communityArticles.title,
    slug: communityArticles.slug,
    excerpt: communityArticles.excerpt,
    content: communityArticles.content,
    featuredImage: communityArticles.featuredImage,
    status: communityArticles.status,
    createdAt: communityArticles.createdAt,
    category: { id: categories.id, name: categories.name, slug: categories.slug },
    author: { id: users.id, username: users.username, avatar: users.avatar },
  }).from(communityArticles)
    .leftJoin(categories, eq(communityArticles.categoryId, categories.id))
    .leftJoin(users, eq(communityArticles.authorId, users.id))
    .where(eq(communityArticles.status, 'approved'))
    .orderBy(desc(communityArticles.createdAt))
    .all()
})
