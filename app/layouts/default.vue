<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-harley-black text-white sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <NuxtLink to="/" class="flex items-center gap-2">
            <span class="text-2xl font-black tracking-tight">
              <span class="text-harley-orange">HARLEY</span>
              <span class="text-white">BLOG</span>
            </span>
          </NuxtLink>

          <nav class="hidden md:flex items-center gap-6">
            <NuxtLink to="/blog" class="text-harley-silver hover:text-harley-orange transition text-sm font-medium uppercase tracking-wider">
              Blog
            </NuxtLink>
            <NuxtLink to="/forum" class="text-harley-silver hover:text-harley-orange transition text-sm font-medium uppercase tracking-wider">
              Forum
            </NuxtLink>
            <NuxtLink to="/communaute" class="text-harley-silver hover:text-harley-orange transition text-sm font-medium uppercase tracking-wider">
              Communauté
            </NuxtLink>
            <NuxtLink to="/emplois" class="text-harley-silver hover:text-harley-orange transition text-sm font-medium uppercase tracking-wider">
              Emplois
            </NuxtLink>
          </nav>

          <div class="flex items-center gap-3">
            <button @click="toggleSearch" class="text-harley-silver hover:text-harley-orange transition p-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>

            <template v-if="user">
              <NuxtLink to="/admin" v-if="user.role === 'admin' || user.role === 'moderator'" class="text-harley-silver hover:text-harley-orange transition text-sm uppercase tracking-wider">
                Admin
              </NuxtLink>
              <button @click="logout" class="text-harley-silver hover:text-harley-orange transition text-sm uppercase tracking-wider">
                Déconnexion
              </button>
            </template>
            <template v-else>
              <NuxtLink to="/connexion" class="text-harley-silver hover:text-harley-orange transition text-sm uppercase tracking-wider">
                Connexion
              </NuxtLink>
              <NuxtLink to="/inscription" class="bg-harley-orange hover:bg-harley-orange-dark text-white px-4 py-2 rounded text-sm font-semibold uppercase tracking-wider transition">
                S'inscrire
              </NuxtLink>
            </template>

            <button @click="menuOpen = !menuOpen" class="md:hidden text-harley-silver p-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>

        <div v-if="menuOpen" class="md:hidden pb-4 border-t border-gray-800 pt-4">
          <div class="flex flex-col gap-3">
            <NuxtLink to="/blog" class="text-harley-silver hover:text-harley-orange text-sm uppercase tracking-wider" @click="menuOpen = false">Blog</NuxtLink>
            <NuxtLink to="/forum" class="text-harley-silver hover:text-harley-orange text-sm uppercase tracking-wider" @click="menuOpen = false">Forum</NuxtLink>
            <NuxtLink to="/communaute" class="text-harley-silver hover:text-harley-orange text-sm uppercase tracking-wider" @click="menuOpen = false">Communauté</NuxtLink>
            <NuxtLink to="/emplois" class="text-harley-silver hover:text-harley-orange text-sm uppercase tracking-wider" @click="menuOpen = false">Emplois</NuxtLink>
          </div>
        </div>
      </div>

      <div v-if="showSearch" class="border-t border-gray-800 bg-harley-dark">
        <div class="max-w-3xl mx-auto px-4 py-4">
          <input
            v-model="searchQuery"
            @keydown.enter="doSearch"
            type="text"
            placeholder="Rechercher un article, une question..."
            class="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-harley-orange"
          />
        </div>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="bg-harley-black text-harley-gray-light py-12">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-3 gap-8">
          <div>
            <span class="text-2xl font-black tracking-tight">
              <span class="text-harley-orange">HARLEY</span>
              <span class="text-white">BLOG</span>
            </span>
            <p class="mt-3 text-sm">Le blog communautaire dédié à l'univers Harley-Davidson. Fiches techniques, tutoriels, culture et passion.</p>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-3 uppercase text-sm tracking-wider">Navigation</h4>
            <div class="flex flex-col gap-2 text-sm">
              <NuxtLink to="/blog" class="hover:text-harley-orange transition">Blog</NuxtLink>
              <NuxtLink to="/forum" class="hover:text-harley-orange transition">Forum</NuxtLink>
              <NuxtLink to="/communaute" class="hover:text-harley-orange transition">Communauté</NuxtLink>
              <NuxtLink to="/emplois" class="hover:text-harley-orange transition">Emplois</NuxtLink>
            </div>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-3 uppercase text-sm tracking-wider">Catégories</h4>
            <div class="flex flex-col gap-2 text-sm">
              <NuxtLink v-for="cat in categories" :key="cat.id" :to="`/blog/categorie/${cat.slug}`" class="hover:text-harley-orange transition">{{ cat.name }}</NuxtLink>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-xs">
          &copy; {{ new Date().getFullYear() }} BlogHarley — Tous droits réservés. Harley-Davidson est une marque déposée.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { user, clear } = useUserSession()
const router = useRouter()
const menuOpen = ref(false)
const showSearch = ref(false)
const searchQuery = ref('')

const { data: categories } = await useFetch('/api/categories')

function toggleSearch() {
  showSearch.value = !showSearch.value
  if (!showSearch.value) searchQuery.value = ''
}

function doSearch() {
  if (searchQuery.value.trim()) {
    router.push(`/recherche?q=${encodeURIComponent(searchQuery.value.trim())}`)
    showSearch.value = false
    searchQuery.value = ''
  }
}

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await clear()
  router.push('/')
}
</script>
