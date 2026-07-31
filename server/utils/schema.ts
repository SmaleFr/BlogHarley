import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role', { enum: ['admin', 'moderator', 'user'] }).notNull().default('user'),
  active: integer('active', { mode: 'boolean' }).notNull().default(true),
  avatar: text('avatar'),
  bio: text('bio'),
  reputation: integer('reputation').notNull().default(0),
  createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
  updatedAt: text('updated_at').notNull().default(sql`(current_timestamp)`),
})

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  icon: text('icon'),
  color: text('color').notNull().default('#ff6600'),
  createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
})

export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
})

export const articles = sqliteTable('articles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  featuredImage: text('featured_image'),
  readingTime: integer('reading_time'),
  categoryId: integer('category_id').references(() => categories.id),
  authorId: integer('author_id').references(() => users.id).notNull(),
  published: integer('published', { mode: 'boolean' }).notNull().default(false),
  publishedAt: text('published_at'),
  createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
  updatedAt: text('updated_at').notNull().default(sql`(current_timestamp)`),
})

export const communityArticles = sqliteTable('community_articles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  featuredImage: text('featured_image'),
  categoryId: integer('category_id').references(() => categories.id),
  authorId: integer('author_id').references(() => users.id).notNull(),
  status: text('status', { enum: ['pending', 'approved', 'rejected'] }).notNull().default('pending'),
  reviewedBy: integer('reviewed_by').references(() => users.id),
  reviewedAt: text('reviewed_at'),
  rejectionReason: text('rejection_reason'),
  createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
  updatedAt: text('updated_at').notNull().default(sql`(current_timestamp)`),
})

export const forumQuestions = sqliteTable('forum_questions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  authorId: integer('author_id').references(() => users.id).notNull(),
  views: integer('views').notNull().default(0),
  votes: integer('votes').notNull().default(0),
  answersCount: integer('answers_count').notNull().default(0),
  acceptedAnswerId: integer('accepted_answer_id'),
  createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
  updatedAt: text('updated_at').notNull().default(sql`(current_timestamp)`),
})

export const forumAnswers = sqliteTable('forum_answers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  content: text('content').notNull(),
  questionId: integer('question_id').references(() => forumQuestions.id).notNull(),
  authorId: integer('author_id').references(() => users.id).notNull(),
  votes: integer('votes').notNull().default(0),
  isAccepted: integer('is_accepted', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
  updatedAt: text('updated_at').notNull().default(sql`(current_timestamp)`),
})

export const votes = sqliteTable('votes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id).notNull(),
  targetType: text('target_type', { enum: ['question', 'answer', 'article', 'community_article'] }).notNull(),
  targetId: integer('target_id').notNull(),
  value: integer('value').notNull(),
  createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
}, (table) => ({
  uniqueVote: uniqueIndex('unique_vote').on(table.userId, table.targetType, table.targetId),
}))

export const forumReports = sqliteTable('forum_reports', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  targetType: text('target_type', { enum: ['question', 'answer'] }).notNull(),
  targetId: integer('target_id').notNull(),
  reporterId: integer('reporter_id').references(() => users.id).notNull(),
  reason: text('reason'),
  status: text('status', { enum: ['pending', 'resolved', 'dismissed'] }).notNull().default('pending'),
  createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
})

export const jobs = sqliteTable('jobs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  company: text('company').notNull(),
  location: text('location'),
  type: text('type', { enum: ['CDI', 'CDD', 'Freelance', 'Stage', 'Prestation'] }).notNull(),
  description: text('description').notNull(),
  contactEmail: text('contact_email'),
  salaryRange: text('salary_range'),
  companyWebsite: text('company_website'),
  applyUrl: text('apply_url'),
  postedById: integer('posted_by_id').references(() => users.id).notNull(),
  approved: integer('approved', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
  expiresAt: text('expires_at'),
})

export const articleTags = sqliteTable('article_tags', {
  articleId: integer('article_id').references(() => articles.id).notNull(),
  tagId: integer('tag_id').references(() => tags.id).notNull(),
})

export const questionTags = sqliteTable('question_tags', {
  questionId: integer('question_id').references(() => forumQuestions.id).notNull(),
  tagId: integer('tag_id').references(() => tags.id).notNull(),
})
