<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold mb-2">Résultats de recherche</h1>
    <p class="text-gray-500 mb-8">{{ totalResults }} résultat(s) pour "{{ q }}"</p>

    <div v-if="results?.articles?.length" class="mb-8">
      <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
        <span class="w-2 h-2 bg-harley-orange rounded-full"></span>
        Articles du blog
      </h2>
      <div class="space-y-3">
        <NuxtLink v-for="article in results.articles" :key="article.id" :to="`/blog/${article.slug}`" class="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
          <h3 class="font-semibold hover:text-harley-orange transition">{{ article.title }}</h3>
          <p class="text-sm text-gray-500 mt-1">{{ article.excerpt?.substring(0, 150) }}...</p>
        </NuxtLink>
      </div>
    </div>

    <div v-if="results?.community?.length" class="mb-8">
      <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
        <span class="w-2 h-2 bg-green-500 rounded-full"></span>
        Articles communauté
      </h2>
      <div class="space-y-3">
        <NuxtLink v-for="article in results.community" :key="article.id" :to="`/communaute/${article.slug}`" class="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
          <h3 class="font-semibold hover:text-harley-orange transition">{{ article.title }}</h3>
          <p class="text-sm text-gray-500 mt-1">{{ article.excerpt?.substring(0, 150) }}...</p>
        </NuxtLink>
      </div>
    </div>

    <div v-if="results?.forum?.length">
      <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
        <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
        Questions du forum
      </h2>
      <div class="space-y-3">
        <NuxtLink v-for="question in results.forum" :key="question.id" :to="`/forum/${question.slug}`" class="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
          <h3 class="font-semibold hover:text-harley-orange transition">{{ question.title }}</h3>
          <p class="text-sm text-gray-500 mt-1">{{ question.excerpt?.substring(0, 150) }}...</p>
        </NuxtLink>
      </div>
    </div>

    <p v-if="!results?.articles?.length && !results?.community?.length && !results?.forum?.length" class="text-center text-gray-500 py-12">
      Aucun résultat trouvé pour votre recherche.
    </p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const q = computed(() => (route.query.q as string) || '')

const { data: results } = await useFetch(() => `/api/search?q=${encodeURIComponent(q.value)}`)

const totalResults = computed(() => (results.value?.articles?.length || 0) + (results.value?.community?.length || 0) + (results.value?.forum?.length || 0))

useHead({ title: `Recherche : ${q.value || ''}` })
</script>
