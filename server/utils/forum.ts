import { db } from './db'
import { forumQuestions, forumAnswers, votes, questionTags } from './schema'
import { eq, and, inArray, sql } from 'drizzle-orm'

export async function deleteForumQuestion(id: number) {
  const answers = await db.select({ id: forumAnswers.id }).from(forumAnswers).where(eq(forumAnswers.questionId, id)).all()
  const answerIds = answers.map(a => a.id)

  if (answerIds.length) {
    await db.delete(votes).where(and(eq(votes.targetType, 'answer'), inArray(votes.targetId, answerIds))).run()
  }
  await db.delete(votes).where(and(eq(votes.targetType, 'question'), eq(votes.targetId, id))).run()
  await db.delete(questionTags).where(eq(questionTags.questionId, id)).run()
  await db.delete(forumAnswers).where(eq(forumAnswers.questionId, id)).run()
  await db.delete(forumQuestions).where(eq(forumQuestions.id, id)).run()
}

export async function deleteForumAnswer(id: number) {
  const answer = await db.select().from(forumAnswers).where(eq(forumAnswers.id, id)).get()
  if (!answer) return

  await db.delete(votes).where(and(eq(votes.targetType, 'answer'), eq(votes.targetId, id))).run()
  await db.delete(forumAnswers).where(eq(forumAnswers.id, id)).run()
  await db.update(forumQuestions).set({ answersCount: sql`${forumQuestions.answersCount} - 1` }).where(eq(forumQuestions.id, answer.questionId)).run()
  if (answer.isAccepted) {
    await db.update(forumQuestions).set({ acceptedAnswerId: null }).where(eq(forumQuestions.id, answer.questionId)).run()
  }
}
