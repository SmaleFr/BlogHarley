<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Articles</h1>
      <button @click="showForm = true; editing = null" class="bg-harley-orange text-white px-4 py-2 rounded text-sm font-semibold hover:bg-harley-orange-dark transition">
        Nouvel article
      </button>
    </div>

    <div v-if="showForm" class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="font-bold mb-4">{{ editing ? 'Modifier' : 'Nouvel' }} article</h2>
      <form @submit.prevent="save" class="space-y-4">
        <input v-model="form.title" placeholder="Titre" required class="w-full border rounded-lg px-4 py-2" />
        <select v-model="form.categoryId" class="w-full border rounded-lg px-4 py-2">
          <option :value="null">Sans catégorie</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
        <textarea v-model="form.content" placeholder="Contenu (Markdown)" required rows="15" class="w-full border rounded-lg px-4 py-2 font-mono text-sm"></textarea>
        <label class="flex items-center gap-2">
          <input type="checkbox" v-model="form.published" />
          <span class="text-sm">Publier</span>
        </label>
        <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
        <div class="flex gap-2">
          <button type="submit" class="bg-harley-orange text-white px-4 py-2 rounded text-sm font-semibold">{{ editing ? 'Mettre à jour' : 'Créer' }}</button>
          <button type="button" @click="showForm = false" class="border px-4 py-2 rounded text-sm">Annuler</button>
        </div>
      </form>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 text-left">
          <tr>
            <th class="px-4 py-3 font-medium">Titre</th>
            <th class="px-4 py-3 font-medium">Catégorie</th>
            <th class="px-4 py-3 font-medium">Statut</th>
            <th class="px-4 py-3 font-medium">Date</th>
            <th class="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in articles" :key="a.id" class="border-t">
            <td class="px-4 py-3">{{ a.title }}</td>
            <td class="px-4 py-3 text-gray-500">{{ a.category?.name || '-' }}</td>
            <td class="px-4 py-3">
              <span class="text-xs px-2 py-1 rounded-full" :class="a.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'">
                {{ a.published ? 'Publié' : 'Brouillon' }}
              </span>
            </td>
            <td class="px-4 py-3 text-gray-500">{{ new Date(a.createdAt).toLocaleDateString('fr-FR') }}</td>
            <td class="px-4 py-3">
              <button @click="edit(a)" class="text-blue-600 hover:underline text-xs mr-2">Modifier</button>
              <button @click="remove(a.id)" class="text-red-600 hover:underline text-xs">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['admin'] })

const { data: categories } = await useFetch('/api/categories')
const { data: articles, refresh } = await useFetch('/api/blog')

const showForm = ref(false)
const editing = ref<any>(null)
const error = ref('')
const form = reactive({ title: '', content: '', categoryId: null as number | null, published: false })

function edit(a: any) {
  editing.value = a
  form.title = a.title
  form.content = a.content
  form.categoryId = a.category?.id || null
  form.published = a.published
  showForm.value = true
}

async function save() {
  error.value = ''
  try {
    if (editing.value) {
      await $fetch(`/api/blog/${editing.value.id}`, { method: 'PUT', body: form })
    } else {
      await $fetch('/api/blog', { method: 'POST', body: form })
    }
    showForm.value = false
    editing.value = null
    form.title = ''; form.content = ''; form.categoryId = null; form.published = false
    refresh()
  } catch (e: any) {
    error.value = e.data?.message || 'Erreur'
  }
}

async function remove(id: number) {
  if (!confirm('Supprimer cet article ?')) return
  await $fetch(`/api/blog/${id}`, { method: 'DELETE' })
  refresh()
}
</script>
