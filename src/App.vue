<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="z-[100] sticky top-0 invisible" >
    <div class='h-1 w-full bg-gray-200 overflow-hidden'>
      <div class='progress w-full h-full bg-gray-600 left-right'></div>
    </div>
  </div>
  <RouterView />
</template>
