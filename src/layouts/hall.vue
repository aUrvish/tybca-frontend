<script setup >
import AppNav from '@/components/AppNav.vue';
import HallNav from '@/components/HallNav.vue';
</script>

<template>
    <div class="flex flex-col h-full">
        <div class="fixed left-0 right-0 top-0 z-50" >
            <AppNav :noSidebar="false" />
            <HallNav />
        </div>
        <div class="h-screen pt-28">
            <slot />
        </div>
    </div>
</template>