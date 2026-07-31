import { db } from '~~/server/utils/db'
import { articles, categories, users } from '~~/server/utils/schema'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user || (session.user.role !== 'admin' && session.user.role !== 'moderator')) {
    throw createError({ statusCode: 403 })
  }

  return await db.select({
    id: articles.id,
    title: articles.title,
    slug: articles.slug,
    content: articles.content,
    excerpt: articles.excerpt,
    featuredImage: articles.featuredImage,
    readingTime: articles.readingTime,
    published: articles.published,
    publishedAt: articles.publishedAt,
    createdAt: articles.createdAt,
    updatedAt: articles.updatedAt,
    category: { id: categories.id, name: categories.name, slug: categories.slug, color: categories.color },
    author: { id: users.id, username: users.username },
  }).from(articles)
    .leftJoin(categories, eq(articles.categoryId, categories.id))
    .leftJoin(users, eq(articles.authorId, users.id))
    .orderBy(desc(articles.createdAt))
    .all()
})
