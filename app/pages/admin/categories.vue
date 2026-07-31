<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Catégories</h1>

    <form @submit.prevent="addCat" class="flex gap-2 mb-6">
      <input v-model="newName" placeholder="Nom de la catégorie" required class="flex-1 border rounded-lg px-4 py-2" />
      <input v-model="newColor" type="color" class="w-12 border rounded-lg" />
      <button type="submit" class="bg-harley-orange text-white px-4 py-2 rounded text-sm font-semibold">Ajouter</button>
    </form>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 text-left">
          <tr><th class="px-4 py-3">Nom</th><th class="px-4 py-3">Slug</th><th class="px-4 py-3">Couleur</th><th class="px-4 py-3">Actions</th></tr>
        </thead>
        <tbody>
          <tr v-for="cat in categories" :key="cat.id" class="border-t">
            <template v-if="editingId === cat.id">
              <td class="px-4 py-3">
                <input v-model="editName" class="w-full border rounded px-2 py-1" />
              </td>
              <td class="px-4 py-3 text-gray-500">{{ cat.slug }}</td>
              <td class="px-4 py-3">
                <input v-model="editColor" type="color" class="w-12 border rounded-lg" />
              </td>
              <td class="px-4 py-3">
                <button @click="saveEdit(cat.id)" class="text-green-600 hover:underline text-xs mr-2">Enregistrer</button>
                <button @click="cancelEdit()" class="text-gray-500 hover:underline text-xs">Annuler</button>
              </td>
            </template>
            <template v-else>
              <td class="px-4 py-3">{{ cat.name }}</td>
              <td class="px-4 py-3 text-gray-500">{{ cat.slug }}</td>
              <td class="px-4 py-3">
                <span class="px-2 py-1 rounded text-xs text-white" :style="{ backgroundColor: cat.color }">{{ cat.color }}</span>
              </td>
              <td class="px-4 py-3">
                <button @click="startEdit(cat)" class="text-blue-600 hover:underline text-xs mr-2">Modifier</button>
                <button @click="removeCat(cat.id)" class="text-red-600 hover:underline text-xs">Supprimer</button>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['admin'] })

const { data: categories, refresh } = await useFetch('/api/categories')
const newName = ref('')
const newColor = ref('#ff6600')

const editingId = ref<number | null>(null)
const editName = ref('')
const editColor = ref('#ff6600')

async function addCat() {
  if (!newName.value.trim()) return
  try {
    await $fetch('/api/admin/categories', { method: 'POST', body: { name: newName.value, color: newColor.value } })
    newName.value = ''
    refresh()
  } catch {}
}

function startEdit(cat: any) {
  editingId.value = cat.id
  editName.value = cat.name
  editColor.value = cat.color
}

function cancelEdit() {
  editingId.value = null
}

async function saveEdit(id: number) {
  if (!editName.value.trim()) return
  try {
    await $fetch(`/api/admin/categories/${id}`, { method: 'PUT', body: { name: editName.value, color: editColor.value } })
    editingId.value = null
    refresh()
  } catch {}
}

async function removeCat(id: number) {
  if (!confirm('Supprimer cette catégorie ?')) return
  await $fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
  refresh()
}
</script>
