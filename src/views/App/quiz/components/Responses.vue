
<script setup >
import Donut from '@/components/Donut.vue';
import UserTable from './UserTable.vue';
import SingleResponse from './SingleResponse.vue';

import { onMounted, reactive, ref, watch } from 'vue'

const count= ref(0);
const isShowSingleResponce= ref(null);
</script>
<template>
    <div class="flex flex-col max-w-screen-lg mx-auto">
        <div >
            <div class="border rounded-md min-h-[200px] bg-white p-4 flex justify-between">
                <div>
                    <h2 class="sm:text-[24px] text-base font-bold">{{ count }}</h2>
                    <p class="text-center text-gray-400 text-[14px] font-normal">Total Responses</p>
                </div>

                <div class="border h-fit p-2 aspect-square grid place-items-center rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="w-6 fill-gray-400" viewBox="0 0 640 512"><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/></svg>
                </div>
            </div>
        </div>
        <div>
            <UserTable @showSingleResponse="(id) => isShowSingleResponce = id" @countTotalResponce="(countVal) => count = countVal" :max="10" class="pt-0" />
        </div>
        <SingleResponse @close="isShowSingleResponce = null" v-if="isShowSingleResponce" :responceId="isShowSingleResponce" />
    </div>
</template>