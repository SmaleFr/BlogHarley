import { db } from '~~/server/utils/db'
import { forumQuestions, users } from '~~/server/utils/schema'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const sort = query.sort || 'recent'

  let orderBy = desc(forumQuestions.createdAt)
  if (sort === 'votes') orderBy = desc(forumQuestions.votes)
  if (sort === 'unanswered') {
    return await db.select({
      id: forumQuestions.id,
      title: forumQuestions.title,
      slug: forumQuestions.slug,
      content: forumQuestions.content,
      views: forumQuestions.views,
      votes: forumQuestions.votes,
      answersCount: forumQuestions.answersCount,
      createdAt: forumQuestions.createdAt,
      author: { id: users.id, username: users.username, avatar: users.avatar },
    }).from(forumQuestions)
      .leftJoin(users, eq(forumQuestions.authorId, users.id))
      .where(eq(forumQuestions.answersCount, 0))
      .orderBy(orderBy)
      .all()
  }

  return await db.select({
    id: forumQuestions.id,
    title: forumQuestions.title,
    slug: forumQuestions.slug,
    content: forumQuestions.content,
    views: forumQuestions.views,
    votes: forumQuestions.votes,
    answersCount: forumQuestions.answersCount,
    createdAt: forumQuestions.createdAt,
    author: { id: users.id, username: users.username, avatar: users.avatar },
  }).from(forumQuestions)
    .leftJoin(users, eq(forumQuestions.authorId, users.id))
    .orderBy(orderBy)
    .all()
})
