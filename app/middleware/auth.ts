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
})
