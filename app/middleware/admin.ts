export default defineNuxtRouteMiddleware(async (to) => {
  const { user, fetch } = useUserSession()

  if (!user.value) {
    if (import.meta.client) {
      await fetch()
    }
    if (!user.value) {
      return navigateTo('/connexion')
    }
  }

  if (user.value.role !== 'admin' && user.value.role !== 'moderator') {
    return navigateTo('/')
  }
})
