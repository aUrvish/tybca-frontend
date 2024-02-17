<script setup >
import AuthNav from '@/components/AuthNav.vue'
import AuthFooter from '@/components/AuthFooter.vue'
</script>

<template>
  <AuthNav />
  <div class="grow 5xl:py-40 py-20 grid place-items-center px-4">
    <slot />
  </div>
  <AuthFooter />
</template>