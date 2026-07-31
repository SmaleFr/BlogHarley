<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <div v-if="article" class="prose max-w-none">
      <div class="flex items-center gap-3 mb-4">
        <span v-if="article.category" class="text-xs font-semibold uppercase px-3 py-1 rounded-full bg-opacity-10" :style="{ backgroundColor: article.category.color + '20', color: article.category.color }">{{ article.category.name }}</span>
        <span class="text-xs text-gray-400">{{ article.readingTime }} min de lecture</span>
      </div>

      <h1 class="text-3xl md:text-4xl font-black mb-4">{{ article.title }}</h1>

      <div class="flex items-center gap-3 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
        <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">{{ article.author?.username?.charAt(0).toUpperCase() }}</div>
        <span>{{ article.author?.username }}</span>
        <span>•</span>
        <span>{{ new Date(article.publishedAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
      </div>

      <div class="prose-harley" v-html="renderedContent"></div>

      <div class="mt-12 pt-8 border-t border-gray-200">
        <NuxtLink to="/blog" class="text-harley-orange hover:underline">← Retour aux articles</NuxtLink>
      </div>
    </div>
    <div v-else class="text-center py-12">
      <p class="text-gray-500">Chargement...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug

const { data: article } = await useFetch(`/api/blog/by/slug/${slug}`)

useHead({
  title: article.value?.title || 'Article',
})

function escapeHtml(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function formatInline(text: string) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
}

const headingStyles: Record<number, string> = {
  1: 'text-3xl font-black mt-10 mb-4',
  2: 'text-2xl font-bold text-harley-orange mt-8 mb-4',
  3: 'text-xl font-bold mt-6 mb-3',
}

const renderedContent = computed(() => {
  if (!article.value?.content) return ''

  return article.value.content
    .split(/\n\n+/)
    .map((block: string) => {
      const lines = block.split('\n').filter(Boolean)
      if (!lines.length) return ''

      const headingMatch = lines.length === 1 && lines[0].match(/^(#{1,3})\s+(.+)$/)
      if (headingMatch) {
        const level = headingMatch[1].length
        return `<h${level} class="${headingStyles[level]}">${formatInline(headingMatch[2])}</h${level}>`
      }

      if (lines.every((line: string) => line.startsWith('- '))) {
        const items = lines.map((line: string) => `<li class="ml-4 list-disc text-gray-700">${formatInline(line.slice(2))}</li>`).join('')
        return `<ul class="mb-4 space-y-1">${items}</ul>`
      }

      return `<p class="mb-4 text-gray-700 leading-relaxed">${lines.map(formatInline).join('<br />')}</p>`
    })
    .join('')
})
</script>
