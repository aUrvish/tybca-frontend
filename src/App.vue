<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <div class='h-1 hidden w-full bg-primary-100 overflow-hidden'>
      <div class='progress w-full h-full bg-primary left-right'></div>
    </div>
  </div>
  <RouterView />
</template>
