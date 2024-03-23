<script setup>
import Hall from '@/layouts/hall.vue'
import Pagination from './components/Pagination.vue'
import VueCountdown from '@chenfengyuan/vue-countdown';
import Btn from '@/components/Btn.vue';

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
const { getFetchAction, setResponceAction } = useQuizStore();
const { auth } = storeToRefs(useAuthStore());

const router = useRouter()
const route = useRoute()
const que = ref({})
const page = ref(1)
const responceArr = ref([])
const status = ref(200);
const result = ref({});

onMounted(
    () => {
        changeStatusLoading(true)
        getFetchAction(route.params.uri)
            .then(
                (res) => {
                    console.log(res);
                    if (res.status == 200 && res.data.data) {
                        que.value = res.data.data
                    }else if (res.status == 202) {
                        status.value = 202
                        que.value = res.data.data
                    }else if(res.status == 205) {
                        status.value = 205
                    }else {
                        status.value = 201
                    }
                    changeStatusLoading(false)
                }
            )
            .catch(
                (e) => {
                    changeStatusLoading(false)
                    router.push({name : '404'})
                    toast(e.response.data.messages, {
                        "type": "error",
                        "dangerouslyHTMLString": true
                    })
                }
            )
    }
)
const selected = ref([])
const pushResponce = (option_id, que_id, type) => {
    console.log('he;ll');
    let respoceObj = {
        que_id: que_id,
        option_id: option_id
    }

    if (type != 'checkboxes') {
        responceArr.value = responceArr.value.filter((curr, index) => curr.que_id != que_id)
        responceArr.value.push(respoceObj)
    } else {
        if (selected.value.includes(option_id)) {
            console.log('hello')
            responceArr.value = responceArr.value.filter((curr, index) => curr.option_id != option_id)
        } else {
            responceArr.value.push(respoceObj)
        }
    }

    selected.value = responceArr.value.map((curr) => curr.option_id)
}

const saveResponse = () => {

    let payload = {
        quiz_id: que.value.id,
        responce: [...responceArr.value]
    }

    changeStatusLoading(true)
    setResponceAction(payload)
        .then(
            (res) => {
                toast(res.data.messages, {
                    "type": res.data.status ? "success" : "error",
                    "dangerouslyHTMLString": true
                })
                changeStatusLoading(false)

                if (res.data.data) {
                    let data = res.data.data
                    result.value = data
                }
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

</script>
<template>
    <Hall :quiz="que">
        <div class="p-5 bg-gray-100 rounded-lg max-w-md mx-auto" v-if="status == 202" >
            <p class="text-center md:text-lg text-base font-normal text-gray-500" >The Exam is Currently close and will begin accepting responce on <b>{{ new Date(que.start_at).toLocaleString() }}</b></p>
        </div>
        <div class="p-5 bg-gray-100 rounded-lg max-w-md mx-auto" v-if="status == 205" >
            <p class="text-center md:text-lg text-base font-normal text-gray-500" >You've already responded</p>
        </div>
        <div class="p-5 bg-gray-100 rounded-lg max-w-md mx-auto" v-if="status == 201" >
            <p class="text-center md:text-lg text-base font-normal text-gray-500" >This Exam is no longer accepting responses</p>
        </div>
        <div class="min-h-[90%] max-w-screen-xl mx-auto flex flex-col px-4 pb-4" v-if="status == 200 && que.questions && !Object.keys(result).length">
            <div class="grow py-28 flex-col flex justify-around relative">
                <div class="absolute top-0 w-full translate-y-1/2 mt-1">
                    <div class="flex justify-between items-start">
                        <div>
                            <VueCountdown :time="(new Date(que.start_at).valueOf() - new Date().valueOf()) + 60000 * Number(que.duration)"
                                v-slot="{ days, hours, minutes, seconds }"
                                class="font-semibold text-gray-400 text-lg text-left flex items-center gap-1">
                                <div class="border rounded-[5px] sm:min-w-10 min-w-6 px-1 text-center"> {{ pad(hours) }}
                                </div>
                                <div class="border rounded-[5px] sm:min-w-10 min-w-6 px-1 text-center"> {{ pad(minutes)
                                    }} </div>
                                <div class="border rounded-[5px] sm:min-w-10 min-w-6 px-1 text-center"> {{ pad(seconds)
                                    }} </div>
                            </VueCountdown>

                            <div class="h-1 mt-1.5 rounded-sm overflow-hidden relative">
                                <div class="bg-success w-2/5 h-full animate-x-bounce absolute"></div>
                            </div>
                        </div>

                        <div class="flex gap-2 items-center">
                            <p class="px-2 py-1 w-fit bg-gray-100 rounded-[8px] font-medium lg:text-sm text-[12px] text-gray-400"
                                v-if="que.questions && que.questions[page - 1]">
                                {{ que.questions[page - 1].point }} Marks</p>
                            <p v-if="que.questions && que.questions[page - 1] && que.questions[page - 1].is_required"
                                class="px-2 py-1 w-fit bg-red-50 rounded-[8px] font-medium lg:text-sm text-[12px] text-red-400">
                                *Required</p>
                        </div>
                    </div>
                </div>
                <div class="font-bold md:text-[24px] text-lg flex items-start gap-4 text-gray-500 mb-8">
                    <span> Q.{{ page }} </span>
                    <h1 v-if="que.questions">
                        {{ que.questions[page - 1].title }}
                    </h1>
                </div>

                <div class="grid md:grid-cols-2 gap-4 w-full">
                    <div class="flex items-center justify-between border rounded-md md:py-3 py-2.5 px-4 group-option"
                        v-if="que.questions && que.questions[page - 1].inputs.length"
                        v-for="(input, index) in que.questions[page - 1].inputs" :key="index"
                        :class="selected.includes(input.id) ? 'border-blue' : ''"
                        @click.prevent="pushResponce(input.id, que.questions[page - 1].id, que.questions[page - 1].type)">
                        <div class="grow items-center gap-4 flex">
                            <p v-if="que.questions[page - 1].type == 'dropdown'">{{ index + 1 }}.</p>
                            <input type="checkbox" :id="`opt${index}`" class="w-4 h-4"
                                :checked="selected.includes(input.id)"
                                v-else-if="que.questions[page - 1].type == 'checkboxes'">
                            <input v-else :id="`opt${index}`" name="que" type="radio" class="w-4 h-4"
                                :checked="selected.includes(input.id)">
                            <label :for="`opt${index}`" class="grow">{{ input.name }}</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-auto flex justify-between items-center sm:flex-row flex-col gap-4">
                <p
                    class="px-2 py-1 w-fit border border-gray-300 rounded-[8px] font-medium lg:text-sm text-[12px] text-gray-400">
                    27 complated</p>
                <div class="flex items-center gap-4">
                    <Pagination v-if="que.questions" :totle="que.questions.length"
                        @changePagination="(val) => page = val" />
                    <Btn v-if="que.questions?.length == page" @click="saveResponse"
                        class="flex justify-center items-center gap-3 text-white font-medium rounded-lg text-sm px-3 py-1.5 text-center"
                        :class="isLoading ? 'bg-primary-200' : 'bg-primary'" :disabled="isLoading">
                        Submit
                        <svg aria-hidden="true" v-if="isLoading" class="w-5 h-5 text-white animate-spin fill-primary"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                    </Btn>
                </div>
            </div>
        </div>
        <div class="min-h-[90%] py-12 justify-center flex items-center flex-col" v-if="Object.keys(result).length" >
            <svg xmlns="http://www.w3.org/2000/svg" class="md:w-20 w-12 fill-green-600" v-if="result.percentage > 34" viewBox="0 0 512 512">
                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/></svg>

            <svg xmlns="http://www.w3.org/2000/svg" class="md:w-20 w-12 fill-red-400" v-else viewBox="0 0 512 512">
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
            </svg>

            <p class="mt-6 md:text-[28px] text-[22px] text-center font-medium" >{{ result.percentage < 34 ? 'Oops...' : 'Congratulations' }}! {{ result.user?.name }} you got {{result.percentage}}% marks <br> in {{ result.course }}</p>
            <p class="md:text-[22px] text-lg text-center font-medium text-gray-500" >You are {{ result.percentage < 34 ? 'fail' : 'pass' }}!</p>
        </div>
    </Hall>
</template>