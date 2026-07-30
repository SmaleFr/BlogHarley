<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <NuxtLink to="/blog" class="text-harley-orange hover:underline text-sm">← Retour au blog</NuxtLink>
    <h1 class="text-3xl font-bold mt-4" v-if="category">{{ category.name }}</h1>
    <p class="text-gray-500 mt-1" v-if="category">{{ category.description }}</p>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: categories } = await useFetch('/api/categories')
const category = computed(() => categories.value?.find((c: any) => c.slug === route.params.slug))
</script>
