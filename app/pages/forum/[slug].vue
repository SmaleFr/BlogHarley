<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <NuxtLink to="/forum" class="text-harley-orange hover:underline text-sm">← Retour au forum</NuxtLink>

    <div v-if="question" class="mt-6">
      <div class="border-b border-gray-200 pb-6">
        <div class="flex gap-4">
          <div class="flex flex-col items-center min-w-16">
            <button @click="vote('question', 1)" class="p-1 hover:text-harley-orange transition" :class="userVote === 1 ? 'text-harley-orange' : 'text-gray-400'">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>
            </button>
            <span class="font-bold text-lg my-1" :class="question.votes >= 0 ? 'text-harley-orange' : 'text-red-500'">{{ question.votes }}</span>
            <button @click="vote('question', -1)" class="p-1 hover:text-red-500 transition" :class="userVote === -1 ? 'text-red-500' : 'text-gray-400'">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
          </div>
          <div class="flex-1">
            <h1 class="text-2xl font-bold mb-4">{{ question.title }}</h1>
            <div class="prose prose-sm max-w-none text-gray-700" v-html="renderedContent"></div>
            <div class="flex items-center gap-3 mt-4 text-sm text-gray-400">
              <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">{{ question.author?.username?.charAt(0).toUpperCase() }}</div>
              <span>{{ question.author?.username }}</span>
              <span>•</span>
              <span>Posée le {{ new Date(question.createdAt).toLocaleDateString('fr-FR') }}</span>
              <template v-if="user">
                <span>•</span>
                <button v-if="!reportedIds.has('question-' + question.id)" @click="report('question', question.id)" class="hover:text-red-500 transition">Signaler</button>
                <span v-else class="text-red-400">Signalé</span>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="text-xl font-bold mb-6">{{ question.answersCount || 0 }} réponse(s)</h2>

        <div v-if="question.answers?.length" class="space-y-6">
          <div v-for="answer in question.answers" :key="answer.id" class="border border-gray-200 rounded-lg p-5" :class="answer.isAccepted ? 'border-green-400 bg-green-50' : ''">
            <div class="flex gap-4">
              <div class="flex flex-col items-center min-w-16">
                <button @click="vote('answer', 1, answer.id)" class="p-1 hover:text-harley-orange transition">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>
                </button>
                <span class="font-bold" :class="answer.votes >= 0 ? 'text-harley-orange' : 'text-red-500'">{{ answer.votes }}</span>
                <button @click="vote('answer', -1, answer.id)" class="p-1 hover:text-red-500 transition">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </button>
              </div>
              <div class="flex-1">
                <div class="text-gray-700 text-sm whitespace-pre-wrap">{{ answer.content }}</div>
                <div class="flex items-center justify-between mt-4">
                  <div class="flex items-center gap-2 text-xs text-gray-400">
                    <span>{{ answer.author?.username }}</span>
                    <span>•</span>
                    <span>{{ new Date(answer.createdAt).toLocaleDateString('fr-FR') }}</span>
                    <template v-if="user">
                      <span>•</span>
                      <button v-if="!reportedIds.has('answer-' + answer.id)" @click="report('answer', answer.id)" class="hover:text-red-500 transition">Signaler</button>
                      <span v-else class="text-red-400">Signalé</span>
                    </template>
                  </div>
                  <div class="flex items-center gap-2">
                    <span v-if="answer.isAccepted" class="text-green-600 text-xs font-semibold">✓ Acceptée</span>
                    <button v-if="!answer.isAccepted && isAuthor" @click="acceptAnswer(answer.id)" class="text-xs text-gray-400 hover:text-green-600 transition">
                      Accepter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p v-else class="text-gray-500 text-sm">Aucune réponse pour le moment. Soyez le premier à répondre !</p>

        <div v-if="user" class="mt-8 border-t border-gray-200 pt-8">
          <h3 class="font-bold mb-4">Votre réponse</h3>
          <textarea v-model="newAnswer" rows="5" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-harley-orange focus:border-transparent" placeholder="Écrivez votre réponse..."></textarea>
          <button @click="submitAnswer" :disabled="!newAnswer.trim() || answering" class="mt-3 bg-harley-orange hover:bg-harley-orange-dark text-white px-6 py-2 rounded text-sm font-semibold transition disabled:opacity-50">
            {{ answering ? 'Envoi...' : 'Publier la réponse' }}
          </button>
        </div>
        <div v-else class="mt-8 border-t border-gray-200 pt-8 text-center">
          <NuxtLink to="/connexion" class="text-harley-orange hover:underline">Connectez-vous pour répondre</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = useUserSession()
const route = useRoute()
const slug = route.params.slug
const newAnswer = ref('')
const answering = ref(false)

const { data: question, refresh } = await useFetch(`/api/forum/${slug}`)
const userVote = ref(0)

const isAuthor = computed(() => user.value?.id === question.value?.author?.id)

const renderedContent = computed(() => {
  return (question.value?.content || '').replace(/\n/g, '<br />')
})

async function vote(targetType: string, value: number, targetId?: number) {
  if (!user.value) return
  try {
    const id = targetType === 'question' ? question.value.id : targetId
    await $fetch('/api/vote', { method: 'POST', body: { targetType, targetId: id, value } })
    userVote.value = userVote.value === value ? 0 : value
    refresh()
  } catch {}
}

async function submitAnswer() {
  if (!newAnswer.value.trim() || answering.value) return
  answering.value = true
  try {
    await $fetch(`/api/forum/${question.value.id}/answers`, { method: 'POST', body: { content: newAnswer.value } })
    newAnswer.value = ''
    refresh()
  } finally {
    answering.value = false
  }
}

async function acceptAnswer(answerId: number) {
  try {
    await $fetch(`/api/forum/answers/${answerId}/accept`, { method: 'PUT' })
    refresh()
  } catch {}
}

const reportedIds = ref(new Set<string>())

async function report(targetType: 'question' | 'answer', targetId: number) {
  const key = `${targetType}-${targetId}`
  if (reportedIds.value.has(key)) return
  const reason = prompt('Pourquoi signalez-vous ce message ? (optionnel)') || undefined
  try {
    await $fetch('/api/forum/report', { method: 'POST', body: { targetType, targetId, reason } })
    reportedIds.value.add(key)
  } catch (e: any) {
    alert(e.data?.message || 'Erreur lors du signalement')
  }
}

useHead({ title: question.value?.title || 'Question' })
</script>
