<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold">Offres d'emploi & Prestations</h1>
        <p class="text-gray-500 mt-1">CDI, CDD, Freelance, Stage, Prestation — le marché de l'emploi Harley</p>
      </div>
      <NuxtLink to="/emplois/deposer" class="bg-harley-orange hover:bg-harley-orange-dark text-white px-4 py-2 rounded text-sm font-semibold transition">
        Déposer une offre
      </NuxtLink>
    </div>

    <div class="flex gap-2 mb-6 flex-wrap">
      <button @click="typeFilter = ''" class="px-4 py-2 rounded-full text-sm font-medium border transition"
        :class="!typeFilter ? 'bg-harley-orange text-white border-harley-orange' : 'border-gray-300 text-gray-600 hover:border-harley-orange'">
        Toutes
      </button>
      <button v-for="t in types" :key="t" @click="typeFilter = t"
        class="px-4 py-2 rounded-full text-sm font-medium border transition"
        :class="typeFilter === t ? 'bg-harley-orange text-white border-harley-orange' : 'border-gray-300 text-gray-600 hover:border-harley-orange'">
        {{ t }}
      </button>
    </div>

    <div v-if="jobs?.length" class="grid md:grid-cols-2 gap-6">
      <div v-for="job in jobs" :key="job.id" class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
        <div class="flex items-start justify-between mb-2">
          <div>
            <span class="text-xs font-semibold uppercase text-harley-orange">{{ job.type }}</span>
            <NuxtLink :to="`/emplois/${job.id}`" class="block font-bold text-lg hover:text-harley-orange transition mt-1">{{ job.title }}</NuxtLink>
          </div>
        </div>
        <p class="text-sm text-gray-600"><strong>{{ job.company }}</strong> <span v-if="job.location">— {{ job.location }}</span></p>
        <p class="text-sm text-gray-500 mt-2">{{ job.description?.substring(0, 150) }}...</p>
        <div class="flex items-center gap-3 mt-4 text-xs text-gray-400">
          <span v-if="job.salaryRange">{{ job.salaryRange }}</span>
          <span v-if="job.salaryRange && job.createdAt">•</span>
          <span>{{ new Date(job.createdAt).toLocaleDateString('fr-FR') }}</span>
        </div>
      </div>
    </div>
    <p v-else class="text-center text-gray-500 py-12">Aucune offre pour le moment.</p>
  </div>
</template>

<script setup lang="ts">
const typeFilter = ref('')
const types = ['CDI', 'CDD', 'Freelance', 'Stage', 'Prestation']

const { data: jobs, refresh } = await useFetch(() => `/api/jobs${typeFilter.value ? `?type=${typeFilter.value}` : ''}`)
watch(typeFilter, () => refresh())
</script>
