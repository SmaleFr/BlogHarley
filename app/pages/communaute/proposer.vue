<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <NuxtLink to="/communaute" class="text-harley-orange hover:underline text-sm">← Retour</NuxtLink>
    <h1 class="text-3xl font-bold mt-4 mb-8">Proposer un article</h1>

    <form @submit.prevent="submit" class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Titre</label>
        <input v-model="title" required minlength="3" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-harley-orange focus:border-transparent" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
        <select v-model="categoryId" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-harley-orange focus:border-transparent">
          <option :value="undefined">Sélectionner une catégorie</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Contenu</label>
        <textarea v-model="content" required minlength="10" rows="15" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-harley-orange focus:border-transparent"></textarea>
      </div>
      <p class="text-sm text-gray-500">Votre article sera soumis à modération avant publication.</p>
      <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
      <button type="submit" :disabled="loading" class="bg-harley-orange hover:bg-harley-orange-dark text-white px-6 py-2.5 rounded-lg font-semibold transition disabled:opacity-50">
        {{ loading ? 'Envoi...' : 'Soumettre l\'article' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['auth'] })

const router = useRouter()
const { data: categories } = await useFetch('/api/categories')
const title = ref('')
const content = ref('')
const categoryId = ref<number | undefined>()
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await $fetch('/api/community', {
      method: 'POST',
      body: { title: title.value, content: content.value, categoryId: categoryId.value },
    })
    router.push('/communaute')
  } catch (e: any) {
    error.value = e.data?.message || 'Erreur lors de l\'envoi'
  } finally {
    loading.value = false
  }
}
</script>
