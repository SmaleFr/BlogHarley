import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from './schema'

const client = createClient({
  url: process.env.TURSO_DB_URL || 'file:./data/blog-harley.db',
  authToken: process.env.TURSO_DB_TOKEN,
})

export const db = drizzle(client, { schema })
