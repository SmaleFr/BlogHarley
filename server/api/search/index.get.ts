import { db } from '~~/server/utils/db'
import { sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const q = (query.q as string)?.trim()
  if (!q || q.length < 2) return { articles: [], forum: [], community: [] }

  const searchTerm = `%${q}%`

  const foundArticles = await db.all(sql`
    SELECT id, title, slug, excerpt, 'article' as type FROM articles
    WHERE published = 1 AND (title LIKE ${searchTerm} OR content LIKE ${searchTerm})
    LIMIT 10
  `)

  const foundCommunity = await db.all(sql`
    SELECT id, title, slug, excerpt, 'community' as type FROM community_articles
    WHERE status = 'approved' AND (title LIKE ${searchTerm} OR content LIKE ${searchTerm})
    LIMIT 10
  `)

  const foundForum = await db.all(sql`
    SELECT id, title, slug, substr(content, 1, 150) as excerpt, 'forum' as type FROM forum_questions
    WHERE title LIKE ${searchTerm} OR content LIKE ${searchTerm}
    LIMIT 10
  `)

  return { articles: foundArticles, community: foundCommunity, forum: foundForum }
})
