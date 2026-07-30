import { db } from '~~/server/utils/db'
import { articles, categories, users } from '~~/server/utils/schema'
import { eq, desc, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const conditions = [eq(articles.published, true)]

  if (query.categorie) {
    const cat = await db.select().from(categories).where(eq(categories.slug, query.categorie as string)).get()
    if (cat) conditions.push(eq(articles.categoryId, cat.id))
  }

  const result = await db.select({
    id: articles.id,
    title: articles.title,
    slug: articles.slug,
    excerpt: articles.excerpt,
    featuredImage: articles.featuredImage,
    readingTime: articles.readingTime,
    publishedAt: articles.publishedAt,
    category: { id: categories.id, name: categories.name, slug: categories.slug, color: categories.color },
    author: { id: users.id, username: users.username, avatar: users.avatar },
  }).from(articles)
    .leftJoin(categories, eq(articles.categoryId, categories.id))
    .leftJoin(users, eq(articles.authorId, users.id))
    .where(and(...conditions))
    .orderBy(desc(articles.publishedAt))
    .all()

  return result
})
