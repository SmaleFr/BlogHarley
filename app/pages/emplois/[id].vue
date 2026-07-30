<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <NuxtLink to="/emplois" class="text-harley-orange hover:underline text-sm">← Retour aux offres</NuxtLink>

    <div v-if="job" class="mt-6">
      <div class="flex items-start justify-between mb-4">
        <div>
          <span class="text-xs font-semibold uppercase text-harley-orange">{{ job.type }}</span>
          <h1 class="text-3xl font-bold mt-1">{{ job.title }}</h1>
          <p class="text-gray-600 mt-1"><strong>{{ job.company }}</strong> <span v-if="job.location">— {{ job.location }}</span></p>
        </div>
      </div>

      <div class="flex flex-wrap gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
        <span v-if="job.salaryRange">💰 {{ job.salaryRange }}</span>
        <span>📅 Publiée le {{ new Date(job.createdAt).toLocaleDateString('fr-FR') }}</span>
      </div>

      <div class="text-gray-700 leading-relaxed whitespace-pre-wrap mb-8">{{ job.description }}</div>

      <div class="flex gap-4">
        <a v-if="job.applyUrl" :href="job.applyUrl" target="_blank" class="bg-harley-orange hover:bg-harley-orange-dark text-white px-6 py-3 rounded-lg font-semibold transition">
          Postuler
        </a>
        <a v-if="job.contactEmail" :href="`mailto:${job.contactEmail}`" class="border border-harley-orange text-harley-orange px-6 py-3 rounded-lg font-semibold hover:bg-harley-orange hover:text-white transition">
          Contacter
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: job } = await useFetch(`/api/jobs/${route.params.id}`)
useHead({ title: job.value?.title || 'Offre d\'emploi' })
</script>
