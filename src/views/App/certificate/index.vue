<script setup>
import IFrame from '@/components/IFrame.vue'
import ResultModel from './components/ResultModel.vue'
import { computed, onMounted, ref } from 'vue';

import { storeToRefs } from 'pinia';
import { useLoadStore } from '@/store/loading'
import { toast } from "vue3-toastify";
import { useAuthStore } from '@/store/auth'
import { useQuizStore } from '@/store/quiz'

const { isLoading } = storeToRefs(useLoadStore());
const { changeStatusLoading } = useLoadStore();
const { getResult } = useQuizStore();

const result = ref([])

onMounted(
    () => {
        changeStatusLoading(true)
        getResult()
            .then(
                (res) => {
                    if (res.data.data) {
                        result.value = res.data.data.filter(
                            (curr, index) => {
                                return curr.quiz.certi_signature && curr.quiz.certi_signature != 'null' && ((curr.score * 100) / curr.max) > 33
                            }
                        );
                    }
                    changeStatusLoading(false)
                }
            )
            .catch(
                (e) => {
                    console.log(e);
                    toast(e.response.data.messages, {
                        "type": "error",
                        "dangerouslyHTMLString": true
                    })
                    changeStatusLoading(false)
                }
            )
    }
)

const isShowSingleResult = ref(null)
const selectedObj = ref({})
const isRenderImg = ref(false)
</script>

<template>
    <div class="max-w-screen-xl mx-auto">
        <h1 class="text-[24px] font-semibold">Certificate</h1>

        <div class="mt-5 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4" v-if="result.length" >
            <div v-for="(certi , index) in result" class="rounded-lg overflow-hidden group cursor-pointer"  @click="isShowSingleResult = 1, selectedObj = certi" >
                <div>
                    <div class="aspect-[5/3.5] w-full relative overflow-hidden" :class="isRenderImg ? '' : `after:content-['']  after:h-full after:w-full after:bg-gray-100 after:z-10 after:absolute after:top-0 after:animate-pulse before:content-['']  before:h-full before:w-full before:bg-white before:z-10 before:absolute before:top-0`" >
                        <IFrame @loadImg="() => isRenderImg = true" :data="certi"/>
                    </div>
                    <div class="px-2 py-2" >
                        <p class="text-sm line-clamp-2 font-medium group-hover:underline">{{ certi.quiz.title }} certificate</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="h-[80vh] grid place-items-center" >
            <p class="text-gray-400 font-normal">No Data Found</p>
        </div>
    </div>
    <ResultModel @close="isShowSingleResult = null" v-if="isShowSingleResult" :responceId="isShowSingleResult" :responce="selectedObj" />
</template>