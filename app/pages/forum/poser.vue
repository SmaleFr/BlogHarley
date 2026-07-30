<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <NuxtLink to="/forum" class="text-harley-orange hover:underline text-sm">← Retour au forum</NuxtLink>
    <h1 class="text-3xl font-bold mt-4 mb-8">Poser une question</h1>

    <form @submit.prevent="submit" class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Titre</label>
        <input v-model="title" required minlength="5" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-harley-orange focus:border-transparent" placeholder="Ex: Comment régler les soupapes d'une Sportster 1200 ?" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea v-model="content" required minlength="10" rows="8" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-harley-orange focus:border-transparent" placeholder="Décrivez votre problème en détail..."></textarea>
      </div>
      <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
      <button type="submit" :disabled="loading" class="bg-harley-orange hover:bg-harley-orange-dark text-white px-6 py-2.5 rounded-lg font-semibold transition disabled:opacity-50">
        {{ loading ? 'Publication...' : 'Publier la question' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['auth'] })

const router = useRouter()
const title = ref('')
const content = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    const q: any = await $fetch('/api/forum', { method: 'POST', body: { title: title.value, content: content.value } })
    router.push(`/forum/${q.slug}`)
  } catch (e: any) {
    error.value = e.data?.message || 'Erreur lors de la publication'
  } finally {
    loading.value = false
  }
}
</script>
