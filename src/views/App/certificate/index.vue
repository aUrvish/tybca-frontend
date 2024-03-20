<script setup>
import IFrame from '@/components/IFrame.vue'
import ResultModel from './components/ResultModel.vue'
import {ref} from 'vue'

const isShowSingleResult = ref(null)
</script>

<template>
    <div class="max-w-screen-xl mx-auto">
        <h1 class="text-[24px] font-semibold">Results</h1>

        <div class="mt-5 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4" >
            <div v-for="i in 4" class="rounded-lg overflow-hidden group cursor-pointer" >
                <div>
                    <IFrame/>
                    <div class="px-2 py-2" >
                        <p class="text-sm line-clamp-2 font-medium underline" @click="isShowSingleResult = 1">Exam 2024-25 result</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ResultModel @close="isShowSingleResult = null" v-if="isShowSingleResult" :responceId="isShowSingleResult" />
</template>