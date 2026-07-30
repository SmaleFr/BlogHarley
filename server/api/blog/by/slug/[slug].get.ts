import { db } from '~~/server/utils/db'
import { articles, categories, users } from '~~/server/utils/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 400, message: 'Slug requis' })

  const result = await db.select({
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
    category: { id: categories.id, name: categories.name, slug: categories.slug, color: categories.color },
    author: { id: users.id, username: users.username, avatar: users.avatar },
  }).from(articles)
    .leftJoin(categories, eq(articles.categoryId, categories.id))
    .leftJoin(users, eq(articles.authorId, users.id))
    .where(eq(articles.slug, slug))
    .get()

  if (!result) throw createError({ statusCode: 404, message: 'Article non trouvé' })

  return result
})
