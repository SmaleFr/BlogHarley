<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Signalements — Forum</h1>

    <div v-if="reports?.length" class="space-y-4">
      <div v-for="r in reports" :key="r.id" class="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-400">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                {{ r.targetType === 'question' ? 'Question' : 'Réponse' }}
              </span>
              <h3 v-if="r.target" class="font-bold">{{ r.target.title || r.target.questionTitle }}</h3>
              <span v-else class="text-sm text-gray-400 italic">Message déjà supprimé</span>
            </div>
            <p class="text-sm text-gray-500">Signalé par {{ r.reporter?.username }} — {{ new Date(r.createdAt).toLocaleDateString('fr-FR') }}</p>
            <p v-if="r.reason" class="mt-2 text-sm text-red-600">Motif : {{ r.reason }}</p>
            <div v-if="r.target" class="mt-2 text-sm text-gray-700 bg-gray-50 rounded p-3 max-h-40 overflow-y-auto">{{ r.target.content?.substring(0, 500) }}...</div>
            <NuxtLink v-if="r.target?.slug || r.target?.questionSlug" :to="`/forum/${r.target.slug || r.target.questionSlug}`" target="_blank" class="text-xs text-harley-orange hover:underline mt-2 inline-block">
              Voir sur le forum ↗
            </NuxtLink>
          </div>
          <div class="flex gap-2 ml-4">
            <button v-if="r.target" @click="resolve(r.id, 'delete')" class="bg-red-600 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-red-700">Supprimer le message</button>
            <button @click="resolve(r.id, 'dismiss')" class="bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs font-semibold hover:bg-gray-300">Ignorer</button>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="text-gray-500">Aucun signalement en attente.</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['admin'] })

const { data: reports, refresh } = await useFetch('/api/admin/forum-reports')

async function resolve(id: number, action: 'delete' | 'dismiss') {
  if (action === 'delete' && !confirm('Supprimer définitivement ce message ?')) return
  await $fetch(`/api/admin/forum-reports/${id}`, { method: 'PUT', body: { action } })
  refresh()
}
</script>
