<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Modération — Articles communauté</h1>

    <div v-if="articles?.length" class="space-y-4">
      <div v-for="a in articles" :key="a.id" class="bg-white rounded-lg shadow p-6" :class="a.status === 'pending' ? 'border-l-4 border-yellow-400' : a.status === 'approved' ? 'border-l-4 border-green-400' : 'border-l-4 border-red-400'">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <h3 class="font-bold">{{ a.title }}</h3>
              <span class="text-xs px-2 py-0.5 rounded-full"
                :class="a.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : a.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                {{ a.status === 'pending' ? 'En attente' : a.status === 'approved' ? 'Approuvé' : 'Refusé' }}
              </span>
            </div>
            <p class="text-sm text-gray-500">Par {{ a.author?.username }} — {{ new Date(a.createdAt).toLocaleDateString('fr-FR') }}</p>
            <div class="mt-2 text-sm text-gray-700 bg-gray-50 rounded p-3 max-h-40 overflow-y-auto">{{ a.content?.substring(0, 500) }}...</div>
            <p v-if="a.rejectionReason" class="mt-2 text-sm text-red-600">Motif : {{ a.rejectionReason }}</p>
          </div>
          <div v-if="a.status === 'pending'" class="flex gap-2 ml-4">
            <button @click="moderate(a.id, 'approved')" class="bg-green-600 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-green-700">Approuver</button>
            <button @click="reject(a.id)" class="bg-red-600 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-red-700">Refuser</button>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="text-gray-500">Aucun article soumis.</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['admin'] })

const showReject = ref<number | null>(null)
const rejectReason = ref('')

const { data: articles, refresh } = await useFetch('/api/admin/moderation')

async function moderate(id: number, status: string) {
  await $fetch(`/api/admin/moderation/${id}`, { method: 'PUT', body: { status } })
  refresh()
}

async function reject(id: number) {
  const reason = prompt('Motif du refus (optionnel) :')
  await $fetch(`/api/admin/moderation/${id}`, { method: 'PUT', body: { status: 'rejected', rejectionReason: reason || undefined } })
  refresh()
}
</script>
