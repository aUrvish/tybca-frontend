<script setup >
import Questions from './components/Questions.vue'
import Responses from './components/Responses.vue'
import Settings from './components/Settings.vue'
import { ref } from 'vue'

const totolePoint = ref(1)
const totoleQue = ref(1)

const activeTabIndex = ref(0)
</script>

<template>
    <div class=" max-w-screen-xl mx-auto">
        <h1 class="text-[24px] font-semibold">Quiz</h1>

        <div class="md:mt-10 mt-5 bg-white border rounded-lg md:p-10 p-5 md:pb-0 pb-0">
            <div class="pb-2 border-b">
                <div class="flex justify-between items-center">

                    <div>
                        <input type="text" class="text-[20px] font-semibold outline-none w-full" value="Quiz title">
                        <p class="text-gray-400 md:text-sm text-[12px]">Created at <span class="font-semibold">22 Jan
                                2024</span> </p>
                    </div>
                    <div class="flex gap-6 items-center">

                        <svg xmlns="http://www.w3.org/2000/svg" class="max-w-4 w-full cursor-pointer" viewBox="0 0 448 512">
                            <path
                                d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z" />
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" class="max-w-4 w-full cursor-pointer" viewBox="0 0 512 512">
                            <path
                                d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                        </svg>
                    </div>

                </div>

                <div class="mt-6 flex justify-between items-center flex-wrap gap-2">
                    <p
                        class="px-2 py-1 w-fit bg-[#FF94321A] rounded-[8px] font-medium lg:text-sm text-[12px] text-[#FF9432]">
                        Software Development</p>

                    <div class="flex items-center gap-2 w-fit">
                        <p
                            class="px-3 py-1 w-fit mx-auto bg-gray-100 rounded-[8px] font-normal lg:text-sm text-[12px] text-gray-500">
                            {{ totolePoint }} Marks</p>
                        <p
                            class="px-3 py-1 w-fit mx-auto bg-gray-100 rounded-[8px] font-medium lg:text-sm text-[12px] text-gray-500">
                            {{ totoleQue }} Questions</p>
                    </div>
                </div>
            </div>
            <ul class="flex justify-center items-center py-3 md:gap-x-5 gap-x-3">
                <li class="cursor-pointer md:text-base text-sm" :class="activeTabIndex == 0 ? 'text-primary' : ''"
                    @click="activeTabIndex = 0">Questions</li>
                <li class="cursor-pointer md:text-base text-sm" :class="activeTabIndex == 1 ? 'text-primary' : ''"
                    @click="activeTabIndex = 1">Responses</li>
                <li class="cursor-pointer md:text-base text-sm" :class="activeTabIndex == 2 ? 'text-primary' : ''"
                    @click="activeTabIndex = 2">Settings</li>
            </ul>
        </div>
        <div class="mt-5">
            <Questions @changeQue="(point , que) => {totolePoint = point , totoleQue = que}" v-if="activeTabIndex == 0" />
            <Responses v-else-if="activeTabIndex == 1" />
            <Settings v-else />
        </div>
    </div>
</template>