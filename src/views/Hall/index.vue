<script setup>
import Hall from '@/layouts/hall.vue'
import Pagination from './components/Pagination.vue'
import VueCountdown from '@chenfengyuan/vue-countdown';

const pad = (n) => {
    return (n < 10) ? ("0" + n) : n;
}

import { storeToRefs } from 'pinia';
import { useLoadStore } from '@/store/loading'
import { computed, onMounted, ref } from 'vue';
import { toast } from "vue3-toastify";
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/store/auth'
import { useQuizStore } from '@/store/quiz'

const { changeStatusLoading } = useLoadStore();
const { isLoading } = storeToRefs(useLoadStore());
const { getFetchAction } = useQuizStore();
const { auth } = storeToRefs(useAuthStore());

const router = useRouter()
const route = useRoute()
onMounted(
    () => {
        changeStatusLoading(true)
        getFetchAction(route.params.uri)
            .then(
                (res) => {
                    console.log(res);
                    changeStatusLoading(false)
                }
            )
            .catch(
                (e) => {
                    toast(e.response.data.messages, {
                        "type": "error",
                        "dangerouslyHTMLString": true
                    })
                    changeStatusLoading(false)
                }
            )
    }
)
</script>
<template>
    <Hall>
        <div class="min-h-[90%] max-w-screen-xl mx-auto flex flex-col px-4 pb-4">

            <div class="grow py-28 flex-col flex justify-around relative">
                <div class="absolute top-0 w-full translate-y-1/2 mt-1">
                    <div class="flex justify-between items-start">
                        <div>
                            <VueCountdown :time="1 * 60 * 60 * 1000" v-slot="{ days, hours, minutes, seconds }"
                                class="font-semibold text-gray-400 text-lg text-left flex items-center gap-1">
                                <div class="border rounded-[5px] sm:min-w-10 min-w-6 px-1 text-center"> {{ pad(hours) }} </div>
                                <div class="border rounded-[5px] sm:min-w-10 min-w-6 px-1 text-center"> {{ pad(minutes) }} </div>
                                <div class="border rounded-[5px] sm:min-w-10 min-w-6 px-1 text-center"> {{ pad(seconds) }} </div>
                            </VueCountdown>

                            <div class="h-1 mt-1.5 rounded-sm overflow-hidden relative">
                                <div class="bg-success w-2/5 h-full animate-x-bounce absolute"></div>
                            </div>
                        </div>

                        <div class="flex gap-2 items-center">
                            <p
                                class="px-2 py-1 w-fit bg-gray-100 rounded-[8px] font-medium lg:text-sm text-[12px] text-gray-400">
                                1 Marks</p>
                            <p
                                class="px-2 py-1 w-fit bg-red-50 rounded-[8px] font-medium lg:text-sm text-[12px] text-red-400">
                                *Required</p>
                        </div>
                    </div>
                </div>
                <div class="font-bold md:text-[24px] text-lg flex items-start gap-4 text-gray-500 mb-8">
                    <span> Q.1 </span>
                    <h1>
                        What is the name of the largest country in the world by area?
                    </h1>
                </div>

                <div class="grid md:grid-cols-2 gap-4 w-full">
                    <div class="flex items-center justify-between border rounded-md md:py-3 py-2.5 px-4 group-option"
                        v-for="ind in 4" :key="ind">
                        <div class="grow items-center gap-4 flex">
                            <input :id="`opt${ind}`" name="que" type="radio" class="w-4 h-4">
                            <label :for="`opt${ind}`" class="grow">Option {{ ind }}</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-auto flex justify-between items-center sm:flex-row flex-col gap-4">
                <p
                    class="px-2 py-1 w-fit border border-gray-300 rounded-[8px] font-medium lg:text-sm text-[12px] text-gray-400">
                    27 complated</p>
                <Pagination />
            </div>
        </div>
    </Hall>
</template>