<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <NuxtLink to="/communaute" class="text-harley-orange hover:underline text-sm">← Retour aux articles communauté</NuxtLink>

    <div v-if="article" class="mt-6">
      <div class="flex items-center gap-3 mb-4">
        <span v-if="article.category" class="text-xs font-semibold uppercase" style="color: #ff6600">{{ article.category.name }}</span>
        <span class="bg-harley-orange/10 text-harley-orange text-xs px-2 py-0.5 rounded-full font-medium">Article communautaire</span>
      </div>

      <h1 class="text-3xl md:text-4xl font-black mb-4">{{ article.title }}</h1>

      <div class="flex items-center gap-3 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
        <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">{{ article.author?.username?.charAt(0).toUpperCase() }}</div>
        <span>Soumis par {{ article.author?.username }}</span>
        <span>•</span>
        <span>{{ new Date(article.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
      </div>

      <div class="text-gray-700 leading-relaxed whitespace-pre-wrap">{{ article.content }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: article } = await useFetch(`/api/community/${route.params.slug}`)
useHead({ title: article.value?.title || 'Article communautaire' })
</script>
