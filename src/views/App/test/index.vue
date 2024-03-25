<script setup>
import VueCountdown from '@chenfengyuan/vue-countdown';

const pad = (n) => {
    return (n < 10) ? ("0" + n) : n;
}

import { ref, reactive, watch, computed, onMounted } from 'vue'
import { toast } from "vue3-toastify";
import { storeToRefs } from 'pinia';
import { useQuizStore } from '@/store/quiz'
import { useLoadStore } from '@/store/loading'
import { useAuthStore } from '@/store/auth'

const { getAllTestAction } = useQuizStore();
const { changeStatusLoading } = useLoadStore();
const { getAuthProfileAction } = useAuthStore();
const { isLoading } = storeToRefs(useLoadStore());
const { auth } = storeToRefs(useAuthStore());

const props = defineProps({
    max: {
        default: 5,
    },
    filter: {
        default: 0
    }
})
const QuizList = ref([])
const pendingQuiz = ref([])
const ActiveQuiz = ref([])
const userCourse = ref([])

onMounted(
    () => {
        getAuthProfileAction()
            .then(
                (res) => {
                    let response = res.data.data;
                    if (response) {
                        if (response.course.length) {
                            userCourse.value = [...response.course.map(curr => curr.course_id)]
                        }else {
                            userCourse.value = []
                        }
                    }
                }
            )
            .catch(
                (e) => {
                    toast(e.response.data.message, {
                        "type": "error",
                        "dangerouslyHTMLString": true
                    })
                }
            )

        changeStatusLoading(true)
        getAllTestAction()
            .then(
                (res) => {

                    if (res.data.data) {
                        console.log(userCourse.value);
                        QuizList.value = res.data.data.filter(curr => userCourse.value.includes(curr.course_id));

                        pendingQuiz.value = QuizList.value.filter((curr, index) => getStatus(curr.start_at, curr.duration) == 2)
                        ActiveQuiz.value = QuizList.value.filter((curr, index) => getStatus(curr.start_at, curr.duration) == 1)
                    }
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

const getStatus = (start, duration) => {
    if (start) {
        let startAt = new Date(start);
        let endAt = new Date(new Date(start).getTime() + Number(duration) * 60000);
        let now = new Date()

        if (endAt.valueOf() < now.valueOf()) {
            return 3
        }

        if (now.valueOf() < startAt.valueOf()) {
            return 2
        }

        if (now.valueOf() >= startAt.valueOf() && now.valueOf() <= endAt.valueOf()) {
            return 1
        }
    } else {
        return 1
    }
}

const sum = (arr) => arr.reduce((p, c) => p + c, 0) || 0;
const getPointSum = (arr) => {
    let point = arr.map(
        (curr) => curr.point
    )

    return sum(point);
}

</script>

<template>
    <div class="max-w-screen-xl mx-auto">
        <h1 class="text-[24px] font-semibold">Test</h1>

        <div class="mt-10" v-if="ActiveQuiz.length">
            <h2 class="text-[20px] font-semibold">Active Test</h2>
            <div class="mt-3 grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 gap-4">
                <div v-for="(test, index) in ActiveQuiz" :key="index" class="group: overflow-hidden group cursor-pointer relative">
                    <router-link :to="`test/${test.uri}`">
                        <div class="w-full bg-white border rounded-lg aspect-[5/3] px-4 py-2 flex flex-col">
                            <div class="w-2 animate-ping aspect-square absolute top-2 right-3 bg-success rounded-full">
                            </div>
                            <p class="text-gray-300 text-sm group-hover:underline font-semibold">#{{ test.id }}</p>
                            <p class="line-clamp-2 text-lg font-semibold mt-3 text-gray-500">{{ test.title }}</p>
                            <div class="mt-auto mb-1">
                                <p class="px-2 py-1 mb-3 line-clamp-1 w-fit rounded-[8px] font-medium text-sm"
                                    :style="{ color: test.course.primary_color, backgroundColor: `${test.course.primary_color}1A` }">
                                    {{ test.course.name }}
                                </p>
                                <div class="flex justify-between items-center">
                                    <p class="text-[12px] font-semibold text-gray-400">TOTAL QUESTION : {{ test.questions.length }}</p>
                                    <p class="text-[12px] font-semibold text-gray-400">TOTAL MARKS : {{ getPointSum(test.questions) }}</p>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>

        <div class="mt-8" v-if="pendingQuiz.length">
            <h2 class="text-[20px] font-semibold">Pending Test</h2>
            <div class="mt-3 grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 gap-4">
                <div v-for="(test, index) in pendingQuiz" :key="index"
                    class="group: overflow-hidden group cursor-pointer relative">
                    <router-link :to="`test/${test.uri}`">
                        <div class="w-full bg-white rounded-lg aspect-[5/3] px-4 py-2 flex flex-col border">
                            <div class="flex justify-between items-center">
                                <p class="text-gray-300 text-sm group-hover:underline font-semibold">#{{ test.id }}</p>


                                <VueCountdown :time="(new Date(test.start_at).valueOf() - new Date().valueOf()) + 60000"
                                    v-slot="{ days, hours, minutes, seconds }"
                                    class="font-semibold text-gray-400 text-[12px] text-left flex items-center gap-1">
                                    <div class="border rounded-[5px] min-w-6 px-1 text-center"> {{ pad(days) }} </div>
                                    <div class="border rounded-[5px] min-w-6 px-1 text-center"> {{ pad(hours) }} </div>
                                    <div class="border rounded-[5px] min-w-6 px-1 text-center"> {{ pad(minutes) }}
                                    </div>
                                    <div class="border rounded-[5px] min-w-6 px-1 text-center"> {{ pad(seconds) }}
                                    </div>
                                </VueCountdown>
                            </div>
                            <p class="line-clamp-2 text-lg font-semibold mt-3 text-gray-500">{{ test.title }}</p>
                            <div class="mt-auto mb-1">
                                <p class="px-2 py-1 mb-3 line-clamp-1 w-fit rounded-[8px] font-medium text-sm"
                                    :style="{ color: test.course.primary_color, backgroundColor: `${test.course.primary_color}1A` }">
                                    {{ test.course.name }}
                                </p>
                                <div class="flex justify-between items-center">
                                    <p class="text-[12px] font-semibold text-gray-400">TOTAL QUESTION : {{ test.questions.length }}</p>
                                    <p class="text-[12px] font-semibold text-gray-400">TOTAL MARKS : {{ getPointSum(test.questions) }}</p>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>