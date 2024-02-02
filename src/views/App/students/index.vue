<script setup>
import StudentCard from './components/StudentCard.vue'
import Btn from '@/components/Btn.vue';
</script>
<template>
    <div>
        <div class="flex justify-between items-center">
            <h1 class="text-[24px] font-semibold">Users List</h1>
            <Btn class="text-white bg-gray-950 font-medium rounded-md text-sm px-5 py-2.5 text-center">
                Add Users
            </Btn>
        </div>
        <div class="pt-10 flex justify-end items-center">

            <div>
                <Btn class="text-white bg-gray-950 font-medium rounded-md text-sm py-2.5 px-3.5 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" fill="currentColor" class="text-white"
                        viewBox="0 0 320 512">
                        <path
                            d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z" />
                    </svg>
                </Btn>
            </div>
            <div class="relative ml-4">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                        viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd" />
                    </svg>
                </div>
                <input type="text" id="simple-search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block pl-10 p-2"
                    placeholder="Search">
            </div>
        </div>
    </div>
    <div class="grid 5xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 xsm:grid-cols-2 gap-4 mt-5">
        <StudentCard v-for="i in 20" :key="i" />
    </div>
</template>