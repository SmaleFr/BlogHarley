export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (session.user) {
    event.context.user = session.user
  }
})
