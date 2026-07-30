<template>
  <div class="max-w-5xl mx-auto px-4 py-12">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold">Forum Q&A</h1>
        <p class="text-gray-500 mt-1">Posez vos questions, partagez vos connaissances</p>
      </div>
      <NuxtLink to="/forum/poser" class="bg-harley-orange hover:bg-harley-orange-dark text-white px-4 py-2 rounded text-sm font-semibold transition">
        Poser une question
      </NuxtLink>
    </div>

    <div class="flex gap-2 mb-6">
      <button v-for="tab in tabs" :key="tab.key" @click="sort = tab.key"
        class="px-4 py-2 rounded-full text-sm font-medium border transition"
        :class="sort === tab.key ? 'bg-harley-orange text-white border-harley-orange' : 'border-gray-300 text-gray-600 hover:border-harley-orange'">
        {{ tab.label }}
      </button>
    </div>

    <div v-if="questions?.length" class="space-y-4">
      <div v-for="q in questions" :key="q.id" class="border border-gray-200 rounded-lg p-5 hover:shadow-md transition">
        <div class="flex gap-4">
          <div class="flex flex-col items-center min-w-16 text-sm">
            <span class="font-bold text-lg" :class="q.votes >= 0 ? 'text-harley-orange' : 'text-red-500'">{{ q.votes }}</span>
            <span class="text-xs text-gray-400">votes</span>
            <span class="font-bold mt-2" :class="q.answersCount > 0 ? 'text-green-600' : 'text-gray-400'">{{ q.answersCount }}</span>
            <span class="text-xs text-gray-400">réponses</span>
          </div>
          <div class="flex-1">
            <NuxtLink :to="`/forum/${q.slug}`" class="font-semibold text-lg hover:text-harley-orange transition">{{ q.title }}</NuxtLink>
            <p class="text-sm text-gray-500 mt-1">{{ q.content?.substring(0, 150) }}...</p>
            <div class="flex items-center gap-3 mt-3 text-xs text-gray-400">
              <span>{{ q.author?.username }}</span>
              <span>•</span>
              <span>{{ new Date(q.createdAt).toLocaleDateString('fr-FR') }}</span>
              <span>•</span>
              <span>{{ q.views }} vues</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="text-center text-gray-500 py-12">Aucune question pour le moment.</p>
  </div>
</template>

<script setup lang="ts">
const sort = ref('recent')
const tabs = [
  { key: 'recent', label: 'Récentes' },
  { key: 'votes', label: 'Populaires' },
  { key: 'unanswered', label: 'Non résolues' },
]

const { data: questions, refresh } = await useFetch(() => `/api/forum?sort=${sort.value}`)

watch(sort, () => refresh())
</script>
