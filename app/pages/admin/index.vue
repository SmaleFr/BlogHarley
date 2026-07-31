<template>
  <div class="max-w-7xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
    <div class="grid md:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg shadow p-6">
        <p class="text-sm text-gray-500">Articles</p>
        <p class="text-3xl font-bold text-harley-orange">{{ stats.articles }}</p>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <p class="text-sm text-gray-500">Questions Forum</p>
        <p class="text-3xl font-bold text-harley-orange">{{ stats.questions }}</p>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <p class="text-sm text-gray-500">Articles en attente</p>
        <p class="text-3xl font-bold text-yellow-600">{{ stats.pendingCommunity }}</p>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <p class="text-sm text-gray-500">Offres en attente</p>
        <p class="text-3xl font-bold text-yellow-600">{{ stats.pendingJobs }}</p>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <p class="text-sm text-gray-500">Signalements forum</p>
        <p class="text-3xl font-bold text-yellow-600">{{ stats.pendingReports }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['admin'] })

const { data: stats } = await useFetch('/api/admin')
</script>
