import { db } from '~~/server/utils/db'
import { communityArticles, categories, users } from '~~/server/utils/schema'
import { eq, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 400, message: 'Slug requis' })

  const article = await db.select({
    id: communityArticles.id,
    title: communityArticles.title,
    slug: communityArticles.slug,
    content: communityArticles.content,
    excerpt: communityArticles.excerpt,
    featuredImage: communityArticles.featuredImage,
    status: communityArticles.status,
    createdAt: communityArticles.createdAt,
    category: { id: categories.id, name: categories.name, slug: categories.slug },
    author: { id: users.id, username: users.username, avatar: users.avatar },
  }).from(communityArticles)
    .leftJoin(categories, eq(communityArticles.categoryId, categories.id))
    .leftJoin(users, eq(communityArticles.authorId, users.id))
    .where(and(eq(communityArticles.slug, slug), eq(communityArticles.status, 'approved')))
    .get()

  if (!article) throw createError({ statusCode: 404, message: 'Article non trouvé' })

  return article
})
