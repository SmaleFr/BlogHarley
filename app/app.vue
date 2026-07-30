<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: '%s | BlogHarley',
  meta: [{ name: 'description', content: 'Blog communautaire Harley-Davidson - Articles, Forum, Communauté et Offres d\'emploi' }],
})
</script>
