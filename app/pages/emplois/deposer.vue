<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <NuxtLink to="/emplois" class="text-harley-orange hover:underline text-sm">← Retour aux offres</NuxtLink>

    <div v-if="submitted" class="mt-8 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
      <p class="text-green-800 font-semibold">Merci ! Votre offre a bien été reçue.</p>
      <p class="text-green-700 text-sm mt-2">Elle sera mise en ligne dès qu'elle aura été validée par notre équipe.</p>
      <NuxtLink to="/emplois" class="inline-block mt-4 bg-harley-orange hover:bg-harley-orange-dark text-white px-6 py-2.5 rounded-lg font-semibold transition">
        Retour aux offres
      </NuxtLink>
    </div>

    <template v-else>
    <h1 class="text-3xl font-bold mt-4 mb-8">Déposer une offre</h1>

    <form @submit.prevent="submit" class="space-y-6">
      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Titre du poste *</label>
          <input v-model="title" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-harley-orange" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Type *</label>
          <select v-model="type" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-harley-orange">
            <option value="CDI">CDI</option>
            <option value="CDD">CDD</option>
            <option value="Freelance">Freelance</option>
            <option value="Stage">Stage</option>
            <option value="Prestation">Prestation</option>
          </select>
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Entreprise *</label>
          <input v-model="company" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-harley-orange" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
          <input v-model="location" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-harley-orange" />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Description *</label>
        <textarea v-model="description" required rows="8" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-harley-orange"></textarea>
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email de contact</label>
          <input v-model="contactEmail" type="email" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-harley-orange" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Salaire / Taux</label>
          <input v-model="salaryRange" placeholder="Ex: 45-55k€" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-harley-orange" />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Site web</label>
        <input v-model="companyWebsite" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-harley-orange" />
      </div>
      <p class="text-sm text-gray-500">L'offre sera soumise à modération avant publication.</p>
      <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
      <button type="submit" :disabled="loading" class="bg-harley-orange hover:bg-harley-orange-dark text-white px-6 py-2.5 rounded-lg font-semibold transition disabled:opacity-50">
        {{ loading ? 'Envoi...' : 'Déposer l\'offre' }}
      </button>
    </form>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['auth'] })

const title = ref('')
const company = ref('')
const location = ref('')
const type = ref('CDI')
const description = ref('')
const contactEmail = ref('')
const salaryRange = ref('')
const companyWebsite = ref('')
const error = ref('')
const loading = ref(false)
const submitted = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await $fetch('/api/jobs', {
      method: 'POST',
      body: {
        title: title.value, company: company.value, location: location.value,
        type: type.value, description: description.value, contactEmail: contactEmail.value,
        salaryRange: salaryRange.value, companyWebsite: companyWebsite.value,
      },
    })
    submitted.value = true
  } catch (e: any) {
    error.value = e.data?.message || 'Erreur lors du dépôt'
  } finally {
    loading.value = false
  }
}
</script>
