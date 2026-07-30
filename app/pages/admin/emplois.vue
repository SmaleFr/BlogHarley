<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Offres d'emploi</h1>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 text-left">
          <tr><th class="px-4 py-3">Titre</th><th class="px-4 py-3">Entreprise</th><th class="px-4 py-3">Type</th><th class="px-4 py-3">Statut</th><th class="px-4 py-3">Date</th><th class="px-4 py-3">Actions</th></tr>
        </thead>
        <tbody>
          <tr v-for="job in jobs" :key="job.id" class="border-t">
            <td class="px-4 py-3">{{ job.title }}</td>
            <td class="px-4 py-3 text-gray-500">{{ job.company }}</td>
            <td class="px-4 py-3">{{ job.type }}</td>
            <td class="px-4 py-3">
              <span class="text-xs px-2 py-1 rounded-full" :class="job.approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'">
                {{ job.approved ? 'Approuvée' : 'En attente' }}
              </span>
            </td>
            <td class="px-4 py-3 text-gray-500">{{ new Date(job.createdAt).toLocaleDateString('fr-FR') }}</td>
            <td class="px-4 py-3">
              <button v-if="!job.approved" @click="setApproved(job.id, true)" class="text-green-600 hover:underline text-xs mr-2">Approuver</button>
              <button v-if="job.approved" @click="setApproved(job.id, false)" class="text-yellow-600 hover:underline text-xs mr-2">Désactiver</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['admin'] })

const { data: jobs, refresh } = await useFetch('/api/admin/jobs')

async function setApproved(id: number, approved: boolean) {
  await $fetch(`/api/admin/jobs/${id}`, { method: 'PUT', body: { approved } })
  refresh()
}
</script>
