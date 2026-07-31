<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Utilisateurs</h1>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 text-left">
          <tr><th class="px-4 py-3">Pseudo</th><th class="px-4 py-3">Email</th><th class="px-4 py-3">Rôle</th><th class="px-4 py-3">Statut</th><th class="px-4 py-3">Réputation</th><th class="px-4 py-3">Inscrit le</th><th class="px-4 py-3">Actions</th></tr>
        </thead>
        <tbody>
          <tr v-for="u in users" :key="u.id" class="border-t">
            <td class="px-4 py-3 font-medium">{{ u.username }}</td>
            <td class="px-4 py-3 text-gray-500">{{ u.email }}</td>
            <td class="px-4 py-3">
              <span class="text-xs px-2 py-1 rounded-full"
                :class="u.role === 'admin' ? 'bg-red-100 text-red-700' : u.role === 'moderator' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'">
                {{ u.role }}
              </span>
            </td>
            <td class="px-4 py-3">
              <span class="text-xs px-2 py-1 rounded-full" :class="u.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                {{ u.active ? 'Actif' : 'Désactivé' }}
              </span>
            </td>
            <td class="px-4 py-3">{{ u.reputation }}</td>
            <td class="px-4 py-3 text-gray-500">{{ new Date(u.createdAt).toLocaleDateString('fr-FR') }}</td>
            <td class="px-4 py-3">
              <select @change="changeRole(u.id, ($event.target as HTMLSelectElement).value)" class="text-xs border rounded px-2 py-1 mr-2">
                <option value="user" :selected="u.role === 'user'">user</option>
                <option value="moderator" :selected="u.role === 'moderator'">moderator</option>
                <option value="admin" :selected="u.role === 'admin'">admin</option>
              </select>
              <button v-if="u.active" @click="toggleActive(u)" class="text-red-600 hover:underline text-xs">Désactiver</button>
              <button v-else @click="toggleActive(u)" class="text-green-600 hover:underline text-xs">Réactiver</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['admin'] })

const { data: users, refresh } = await useFetch('/api/admin/users')

async function changeRole(id: number, role: string) {
  await $fetch(`/api/admin/users/${id}`, { method: 'PUT', body: { role } })
  refresh()
}

async function toggleActive(u: any) {
  const action = u.active ? 'désactiver' : 'réactiver'
  if (!confirm(`Confirmer : ${action} le compte de ${u.username} ?`)) return
  try {
    await $fetch(`/api/admin/users/${u.id}`, { method: 'PUT', body: { active: !u.active } })
    refresh()
  } catch (e: any) {
    alert(e.data?.message || 'Erreur')
  }
}
</script>
