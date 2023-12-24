<script setup >
import AuthNav from '@/components/AuthNav.vue'
import AuthFooter from '@/components/AuthFooter.vue'
</script>

<template>
  <AuthNav />
  <div class="h-full grid place-items-center px-4">
    <slot />
  </div>
  <AuthFooter />
</template>