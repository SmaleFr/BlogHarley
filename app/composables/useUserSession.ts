let _fetchPromise: Promise<void> | null = null

export const useUserSession = () => {
  const user = useState<any>('session-user', () => null)

  async function fetch() {
    if (!_fetchPromise) {
      _fetchPromise = $fetch('/api/auth/me')
        .then((data) => { user.value = data })
        .catch(() => { user.value = null })
        .finally(() => { _fetchPromise = null })
    }
    return _fetchPromise
  }

  if (import.meta.server) {
    const event = useRequestEvent()
    if (event?.context?.user) {
      user.value = event.context.user
    }
  }

  if (import.meta.client && !user.value) {
    fetch()
  }

  async function refresh() {
    _fetchPromise = null
    return await fetch()
  }

  async function clear() {
    user.value = null
    _fetchPromise = null
  }

  return { user, fetch, refresh, clear }
}
