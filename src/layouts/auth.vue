<script setup >
import AuthNav from '@/components/AuthNav.vue'
</script>

<template>
  <AuthNav>
    <slot name="navlink" />
  </AuthNav>
  <div class="grow py-20 grid place-items-center px-4">
    <slot />
  </div>
</template>