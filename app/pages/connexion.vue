<template>
  <div class="min-h-screen flex items-center justify-center bg-harley-black px-4">
    <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <NuxtLink to="/" class="text-3xl font-black tracking-tight">
          <span class="text-harley-orange">HARLEY</span>
          <span class="text-harley-black">BLOG</span>
        </NuxtLink>
        <p class="text-gray-500 mt-2 text-sm">Connectez-vous à votre compte</p>
      </div>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="email" type="email" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-harley-orange focus:border-transparent" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
          <input v-model="password" type="password" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-harley-orange focus:border-transparent" />
        </div>
        <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
        <button type="submit" :disabled="loading" class="w-full bg-harley-orange hover:bg-harley-orange-dark text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50">
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>

      <p class="text-center text-sm text-gray-500 mt-6">
        Pas encore de compte ?
        <NuxtLink to="/inscription" class="text-harley-orange hover:underline font-medium">S'inscrire</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const { refresh } = useUserSession()
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function login() {
  error.value = ''
  loading.value = true
  try {
    await $fetch('/api/auth/login', { method: 'POST', body: { email: email.value, password: password.value } })
    await refresh()
    router.push('/')
  } catch (e: any) {
    error.value = e.data?.message || 'Erreur de connexion'
  } finally {
    loading.value = false
  }
}
</script>
