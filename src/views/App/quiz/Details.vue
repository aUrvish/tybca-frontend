<script setup >
import Questions from './components/Questions.vue'
import Responses from './components/Responses.vue'
import Settings from './components/Settings.vue'
import {ref} from 'vue'

const activeTabIndex = ref(0)
</script>

<template>
    <div class=" max-w-screen-xl mx-auto">
        <h1 class="text-[24px] font-semibold">Quiz</h1>

        <div class="mt-10 bg-white border rounded-lg p-10 pb-0">
            <div class="flex justify-between items-center pb-10 border-b">
                <div>
                    <h2 class="text-[20px] font-semibold">Quiz title</h2>
                    <p class="text-gray-400 text-sm" >Created at <span class="font-semibold" >22 Jan 2024</span> </p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="max-w-4 cursor-pointer" viewBox="0 0 512 512">
                    <path
                        d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                </svg>
            </div>
            <ul class="flex justify-center items-center py-3 gap-x-5" >
                <li class="cursor-pointer" :class="activeTabIndex == 0 ?'text-primary' : ''" @click="activeTabIndex = 0" >Questions</li>
                <li class="cursor-pointer" :class="activeTabIndex == 1 ?'text-primary' : ''" @click="activeTabIndex = 1" >Responses</li>
                <li class="cursor-pointer" :class="activeTabIndex == 2 ?'text-primary' : ''" @click="activeTabIndex = 2" >Settings</li>
            </ul>
        </div>
        <div class="mt-5" >
            <Questions v-if="activeTabIndex == 0" />
            <Responses v-else-if="activeTabIndex == 1" />
            <Settings v-else />
        </div>
</div></template>