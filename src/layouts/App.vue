<script setup >
import AppNav from '@/components/AppNav.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
    <div class="antialiased bg-gray-50 dark:bg-gray-900">
        <!-- navbar -->
        <AppNav />

        <!-- Sidebar -->
        <AppSidebar />

        <main class="p-4 lg:ml-64 h-auto pt-20">
            <RouterView/>
        </main>
    </div>
</template>