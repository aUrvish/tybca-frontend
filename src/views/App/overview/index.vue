<script setup>
import Donut from '@/components/Donut.vue'
import SocialProf from './components/SocialProf.vue';
import QuizTable from './components/QuizTable.vue';
import UserTable from './components/UserTable.vue';
import Notice from './components/Notice.vue';
import { toast } from "vue3-toastify";
import { ref, onMounted, watch } from 'vue';
import debounce from 'lodash.debounce'
import Course from './components/Course.vue'

import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/auth'
import { useLoadStore } from '@/store/loading'
import Staff from './components/Staff.vue';
import { useQuizStore } from '@/store/quiz'
const { auth } = storeToRefs(useAuthStore());
const { getResult } = useQuizStore();
const { changeStatusLoading } = useLoadStore();
const { getOverviewStudentsAction, getOverviewTeachersAction, getStudentsSeacherAction, getTeachersSeacherAction } = useAuthStore();

const students = ref([])
const teachers = ref([])
const isOpenCourseModel = ref(false)

const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length || 0;
const sum = (arr) => arr.reduce((p, c) => p + c, 0) || 0;
const getPropertyArr = (arr, property) => arr.map((curr, index) => curr[property])

const PerformanceData = ref([
    {
        time: '0',
        data: 0
    },
])

// const PerformanceData = ref([
//     {
//         time: '2018-09-19',
//         data: 95
//     },
//     {
//         time: '2019-04-13',
//         data: 87
//     },
//     {
//         time: '2019-11-05',
//         data: 92
//     },
//     {
//         time: '2020-03-21',
//         data: 98
//     },
//     {
//         time: '2020-10-01',
//         data: 96
//     },
// ])

// const paymentData = ref([
//     {
//         time: '2018-09-19',
//         data: 6
//     },
//     {
//         time: '2019-04-13',
//         data: 10
//     },
//     {
//         time: '2019-11-05',
//         data: 15
//     },
//     {
//         time: '2020-03-21',
//         data: 20
//     },
//     {
//         time: '2020-10-01',
//         data: 24
//     },
// ])
const responce = ref([])

onMounted(
    () => {
        if (auth.value.user?.role_id == 0 || auth.value.user?.role_id == 1) {

            changeStatusLoading(true)
            getOverviewStudentsAction()
                .then(
                    (res) => {
                        changeStatusLoading(false)
                        if (res.data.data) {
                            let data = res.data.data;
                            students.value = data;
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

        if (auth.value.user?.role_id == 2) {

            changeStatusLoading(true)
            getResult()
                .then(
                    (res) => {
                        if (res.data.data) {
                            responce.value = res.data.data

                            PerformanceData.value.push(
                                ...responce.value.map((curr) => {
                                    return {
                                        time: new Date(curr.created_at).toLocaleDateString().replaceAll("/", "-"),
                                        data: (curr.max != 0 ? ((curr.score * 100) / curr.max) : 0),
                                    }
                                })
                            )
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


        if (auth.value.user?.role_id == 0) {

            changeStatusLoading(true)
            getOverviewTeachersAction()
                .then(
                    (res) => {
                        changeStatusLoading(false)
                        if (res.data.data) {
                            let data = res.data.data;
                            teachers.value = data;
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
    }
)

const studentSearch = ref(null);
watch(
    studentSearch,
    debounce(
        () => {
            changeStatusLoading(true)
            getStudentsSeacherAction({ search: studentSearch.value })
                .then(
                    (res) => {
                        students.value = res.data.data.data.filter((curr, index) => index < 5);
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
        }, 800
    )
)

const teacherSearch = ref(null);
watch(
    teacherSearch,
    debounce(
        () => {
            changeStatusLoading(true)
            getTeachersSeacherAction({ search: teacherSearch.value })
                .then(
                    (res) => {
                        teachers.value = res.data.data.data.filter((curr, index) => index < 5);
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
        }, 800
    )
)
</script>
<template>
    <div class="3lg:max-w-screen-xl max-w-screen-lg mx-auto">
        <div class="3lg:flex gap-4">
            <div class="grow 2mac:max-w-screen-lg 3lg:max-w-screen-md">
                <SocialProf class="grid sm:grid-cols-3 grid-cols-1 gap-4 "
                    @courseOpen="() => isOpenCourseModel = true" />
                <QuizTable :max="5" />
                <UserTable :max="5" :data="students" name="Student"
                    v-if="auth.user.role_id == 0 || auth.user.role_id == 1">
                    <form class="flex items-center w-full">
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor"
                                    viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input type="text" id="simple-search"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2"
                                placeholder="Search" v-model="studentSearch">
                        </div>
                    </form>
                </UserTable>
                <UserTable :max="5" :data="teachers" name="Teacher" v-if="auth.user.role_id == 0">
                    <form class="flex items-center w-full">
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor"
                                    viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input type="text" id="simple-search"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2"
                                placeholder="Search" v-model="teacherSearch">
                        </div>
                    </form>
                </UserTable>

                <Staff v-if="auth.user.role_id == 2" />
            </div>
            <div class="max-w-sm w-full 3lg:block hidden grow">
                <Notice />
                <Donut :data="PerformanceData" pattern="%" title="Performance" class="rounded-sm mt-4"
                    v-if="auth.user.role_id == 2 && PerformanceData.length > 1">
                    {{ average(getPropertyArr(PerformanceData.filter((curr, index) => index != 0), 'data')).toFixed(
                        average(getPropertyArr(PerformanceData.filter((curr, index) => index != 0), 'data')) == 100 ? 0 : 2
                    ) }}%
                </Donut>
            </div>
        </div>
        <Course v-if="isOpenCourseModel" @close="() => isOpenCourseModel = false" />
    </div>

</template>