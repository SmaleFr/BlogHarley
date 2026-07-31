<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold">Blog</h1>
        <p class="text-gray-500 mt-1">Tous les articles Harley-Davidson</p>
      </div>
      <NuxtLink v-if="user?.role === 'admin' || user?.role === 'moderator'" to="/admin/articles" class="bg-harley-orange text-white px-4 py-2 rounded text-sm font-semibold hover:bg-harley-orange-dark transition">
        Écrire un article
      </NuxtLink>
    </div>

    <div class="flex flex-wrap gap-2 mb-8">
      <NuxtLink to="/blog" class="px-4 py-2 rounded-full text-sm font-medium border transition bg-harley-orange text-white border-harley-orange">
        Tous
      </NuxtLink>
      <NuxtLink
        v-for="cat in categories"
        :key="cat.id"
        :to="`/blog/categorie/${cat.slug}`"
        class="px-4 py-2 rounded-full text-sm font-medium border transition border-gray-300 text-gray-600 hover:border-harley-orange"
      >
        {{ cat.name }}
      </NuxtLink>
    </div>

    <div v-if="articles?.length" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <article v-for="article in articles" :key="article.id" class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
        <div class="h-48 bg-gray-200 flex items-center justify-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
        <div class="p-5">
          <div class="flex items-center gap-2 mb-2">
            <span v-if="article.category" class="text-xs font-semibold uppercase" :style="{ color: article.category.color }">{{ article.category.name }}</span>
            <span class="text-xs text-gray-400">{{ article.readingTime }} min</span>
          </div>
          <NuxtLink :to="`/blog/${article.slug}`" class="font-bold text-lg hover:text-harley-orange transition">{{ article.title }}</NuxtLink>
          <p class="text-sm text-gray-500 mt-2">{{ article.excerpt?.substring(0, 120) }}...</p>
          <div class="flex items-center gap-2 mt-4 text-xs text-gray-400">
            <span>{{ article.author?.username }}</span>
            <span>•</span>
            <span>{{ new Date(article.publishedAt).toLocaleDateString('fr-FR') }}</span>
          </div>
        </div>
      </article>
    </div>
    <p v-else class="text-center text-gray-500 py-12">Aucun article trouvé.</p>
  </div>
</template>

<script setup lang="ts">
const { user } = useUserSession()

const { data: categories } = await useFetch('/api/categories')
const { data: articles } = await useFetch('/api/blog')
</script>
