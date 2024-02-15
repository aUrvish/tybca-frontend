<script setup >
import AppNav from './components/AppNav.vue';
import AppSidebar from './components/AppSidebar.vue';
import { RouterView } from 'vue-router';
import { ref } from "vue"
import Notice from '@/views/App/notice/index.vue';

const isShowSidebar = ref(false);

</script>

<template>
    <div class="antialiased bg-gray-50 dark:bg-gray-900">
        <!-- navbar -->
        <AppNav @showSidebar="(value) => isShowSidebar = value" />

        <!-- Sidebar -->
        <AppSidebar :isShow="isShowSidebar" />

        <main class="p-4 lg:ml-64 h-auto pt-20">
            <div class="grid md:grid-cols-2 gap-4 animate-pulse" >
                <div class="aspect-[5/3] rounded-lg" >
                    <div class="grid grid-cols-2 gap-4" >
                        <div class="bg-gray-200 rounded-lg aspect-[5/2.96]" ></div>
                        <div class="bg-gray-200 rounded-lg aspect-[5/2.96]" ></div>
                        <div class="bg-gray-200 rounded-lg aspect-[5/2.96]" ></div>
                        <div class="bg-gray-200 rounded-lg aspect-[5/2.96]" ></div>
                    </div>
                </div>
                <div class="bg-gray-200 aspect-[5/3] rounded-lg" ></div>
                <div class="bg-gray-200 aspect-[5/3] rounded-lg" ></div>
                <div class="bg-gray-200 aspect-[5/3] rounded-lg " ></div>
            </div>
        </main>
    </div>
</template>