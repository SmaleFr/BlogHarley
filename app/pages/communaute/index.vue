<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold">Articles de la Communauté</h1>
        <p class="text-gray-500 mt-1">Articles soumis et approuvés par les membres</p>
      </div>
      <NuxtLink to="/communaute/proposer" class="bg-harley-orange hover:bg-harley-orange-dark text-white px-4 py-2 rounded text-sm font-semibold transition">
        Proposer un article
      </NuxtLink>
    </div>

    <div v-if="articles?.length" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <article v-for="article in articles" :key="article.id" class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
        <div class="p-5">
          <div class="flex items-center gap-2 mb-2">
            <span v-if="article.category" class="text-xs font-semibold uppercase" style="color: #ff6600">{{ article.category.name }}</span>
            <span class="bg-harley-orange/10 text-harley-orange text-xs px-2 py-0.5 rounded-full font-medium">Soumis par {{ article.author?.username }}</span>
          </div>
          <NuxtLink :to="`/communaute/${article.slug}`" class="font-bold text-lg hover:text-harley-orange transition">{{ article.title }}</NuxtLink>
          <p class="text-sm text-gray-500 mt-2">{{ article.excerpt?.substring(0, 120) }}...</p>
          <div class="mt-4 text-xs text-gray-400">{{ new Date(article.createdAt).toLocaleDateString('fr-FR') }}</div>
        </div>
      </article>
    </div>
    <p v-else class="text-center text-gray-500 py-12">Aucun article de la communauté pour le moment.</p>
  </div>
</template>

<script setup lang="ts">
const { data: articles } = await useFetch('/api/community')
</script>
