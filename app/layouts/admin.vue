<template>
  <div class="min-h-screen flex">
    <aside class="w-64 bg-harley-black text-white flex flex-col">
      <div class="p-4 border-b border-gray-800">
        <NuxtLink to="/admin" class="text-xl font-black tracking-tight">
          <span class="text-harley-orange">HARLEY</span>
          <span class="text-white">ADMIN</span>
        </NuxtLink>
      </div>
      <nav class="flex-1 p-4 space-y-1">
        <NuxtLink to="/admin" class="flex items-center gap-3 px-3 py-2 rounded text-sm text-harley-silver hover:text-white hover:bg-gray-800 transition">
          Dashboard
        </NuxtLink>
        <NuxtLink to="/admin/articles" class="flex items-center gap-3 px-3 py-2 rounded text-sm text-harley-silver hover:text-white hover:bg-gray-800 transition">
          Articles
        </NuxtLink>
        <NuxtLink to="/admin/categories" class="flex items-center gap-3 px-3 py-2 rounded text-sm text-harley-silver hover:text-white hover:bg-gray-800 transition">
          Catégories
        </NuxtLink>
        <NuxtLink to="/admin/moderation" class="flex items-center gap-3 px-3 py-2 rounded text-sm text-harley-silver hover:text-white hover:bg-gray-800 transition">
          Modération
        </NuxtLink>
        <NuxtLink to="/admin/emplois" class="flex items-center gap-3 px-3 py-2 rounded text-sm text-harley-silver hover:text-white hover:bg-gray-800 transition">
          Offres d'emploi
        </NuxtLink>
        <NuxtLink to="/admin/utilisateurs" class="flex items-center gap-3 px-3 py-2 rounded text-sm text-harley-silver hover:text-white hover:bg-gray-800 transition">
          Utilisateurs
        </NuxtLink>
      </nav>
      <div class="p-4 border-t border-gray-800">
        <NuxtLink to="/" class="text-sm text-harley-silver hover:text-harley-orange transition">← Retour au site</NuxtLink>
      </div>
    </aside>

    <div class="flex-1 flex flex-col">
      <header class="bg-white border-b border-gray-200 h-16 flex items-center px-6">
        <h1 class="text-lg font-bold text-harley-black">{{ pageTitle }}</h1>
      </header>
      <main class="flex-1 p-6 bg-gray-50">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    'admin-index': 'Dashboard',
    'admin-articles': 'Articles',
    'admin-categories': 'Catégories',
    'admin-moderation': 'Modération',
    'admin-emplois': 'Offres d\'emploi',
    'admin-utilisateurs': 'Utilisateurs',
  }
  return titles[route.name as string] || 'Administration'
})
</script>
