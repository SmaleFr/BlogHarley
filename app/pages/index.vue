<template>
  <div>
    <section class="relative bg-harley-black text-white overflow-hidden">
      <div class="absolute inset-0 opacity-20 bg-gradient-to-br from-harley-orange to-harley-black"></div>
      <div class="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
        <h1 class="text-4xl md:text-6xl font-black tracking-tight mb-4">
          L'Univers<br />
          <span class="text-harley-orange">Harley-Davidson</span>
        </h1>
        <p class="text-lg md:text-xl text-harley-silver max-w-2xl mb-8">
          Fiches techniques, tutoriels mécanique, histoire, culture — le blog communautaire des passionnés de la marque au Bar & Shield.
        </p>
        <div class="flex flex-wrap gap-4">
          <NuxtLink to="/blog" class="bg-harley-orange hover:bg-harley-orange-dark text-white px-6 py-3 rounded-lg font-semibold transition">
            Derniers articles
          </NuxtLink>
          <NuxtLink to="/forum" class="border border-harley-silver hover:border-harley-orange text-harley-silver hover:text-harley-orange px-6 py-3 rounded-lg font-semibold transition">
            Forum Q&A
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 py-16">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold">Catégories</h2>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <NuxtLink
          v-for="cat in categories"
          :key="cat.id"
          :to="`/blog/categorie/${cat.slug}`"
          class="group border border-gray-200 rounded-lg p-4 hover:shadow-lg transition"
          :style="{ borderBottomColor: cat.color, borderBottomWidth: '3px' }"
        >
          <h3 class="font-semibold group-hover:text-harley-orange transition">{{ cat.name }}</h3>
          <p class="text-sm text-gray-500 mt-1">{{ cat.description?.substring(0, 60) }}...</p>
        </NuxtLink>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 py-16">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold">Derniers articles</h2>
        <NuxtLink to="/blog" class="text-harley-orange hover:underline text-sm font-medium">Voir tout</NuxtLink>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </section>

    <section class="bg-gray-100 py-16">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-3 gap-8">
          <NuxtLink to="/forum" class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <h3 class="font-bold text-lg mb-2">💬 Forum Q&A</h3>
            <p class="text-sm text-gray-600">Posez vos questions sur la mécanique, la restauration, les pièces détachées...</p>
          </NuxtLink>
          <NuxtLink to="/communaute" class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <h3 class="font-bold text-lg mb-2">👥 Articles Communauté</h3>
            <p class="text-sm text-gray-600">Partagez vos connaissances — vos articles sont soumis à la communauté.</p>
          </NuxtLink>
          <NuxtLink to="/emplois" class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <h3 class="font-bold text-lg mb-2">💼 Offres d'emploi</h3>
            <p class="text-sm text-gray-600">CDI, CDD, freelance, stages — le marché de l'emploi Harley.</p>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { data: articles } = await useFetch('/api/blog')
const { data: categories } = await useFetch('/api/categories')
</script>
