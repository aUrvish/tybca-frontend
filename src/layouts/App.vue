<script setup >
import AppNav from '@/components/AppNav.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import AppSkeleton from '@/skeleton/App.vue'
import { RouterView } from 'vue-router';
import {onMounted, onUpdated, ref} from "vue" 

const isShowSidebar = ref(false);

</script>

<template>
    <div class="antialiased bg-gray-50 dark:bg-gray-900">
        <!-- navbar -->
        <AppNav @showSidebar="(value) => isShowSidebar = value" />

        <!-- Sidebar -->
        <AppSidebar :isShow="isShowSidebar" />

        <main class="p-4 lg:ml-64 h-auto pt-20">
            <RouterView/>
        </main>
    </div>
    <!-- <AppSkeleton/> -->
</template>