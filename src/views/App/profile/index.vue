<script setup>
import Donut from '@/components/Donut.vue';
import Btn from '@/components/Btn.vue';
import CertiModel from './components/CertiModel.vue'
import ResultModel from './components/ResultModel.vue'

import { ref, reactive, watch, computed, onMounted } from 'vue'
import { minidenticon } from 'minidenticons'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/auth'
import { useLoadStore } from '@/store/loading'
import { useRoute, useRouter } from 'vue-router'
import { toast } from "vue3-toastify";
import services from '@/plugins/service'
import { useQuizStore } from '@/store/quiz'

const { getAuthProfileAction, getAuthProfileActivityAction } = useAuthStore();
const { changeStatusLoading } = useLoadStore();
const { getResult } = useQuizStore();
const { auth } = storeToRefs(useAuthStore());
const { isLoading } = storeToRefs(useLoadStore());
const getStorage = services.storageBaseUrl;
const router = useRouter()
const responce = ref([])
const isShowSingleResult = ref(false)
const isShowSingleCerti = ref(false)

const user = reactive(
    {
        name: null,
        id: null,
        profileImg: null,
        mobile: null,
        gender: null,
        email: null,
        city: null,
        country: null,
        join: null,
        course: [],
        miniAvatar: null
    }
)

onMounted(
    () => {
        // changeStatusLoading(true)

        getAuthProfileAction()
            .then(
                (res) => {
                    let response = res.data.data;
                    if (response) {
                        user.id = response.id
                        user.name = response.name
                        user.email = response.email
                        user.profileImg = response.avatar
                        user.gender = response.gender
                        user.mobile = response.mobile
                        user.city = response.city
                        user.country = response.country
                        user.join = response.created_at
                        user.course = response.course

                        if (!response.avatar) {
                            user.miniAvatar = minidenticon(response.name)
                        }
                    } else {
                        router.push({ name: '404' })
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

        if (auth.value.user.role_id != 2) {


            changeStatusLoading(true)
            getAuthProfileActivityAction()
                .then(
                    (res) => {
                        if (res.data.data) {
                            console.log(res.data.data);
                            responce.value = res.data.data
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
    }
)

const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length || 0;
const sum = (arr) => arr.reduce((p, c) => p + c, 0) || 0;
const getPropertyArr = (arr, property) => arr.map((curr, index) => curr[property])

const PerformanceData = ref([
    {
        time: '0',
        data: 0
    },
])
</script>

<template>
    <div
        class="min-h-[320px] -mx-4 -mt-6 profile-thubnil md:p-10 px-4 pt-10 bg-no-repeat object-cover bg-center bg-cover">
        <div class="flex justify-between flex-wrap gap-4 items-start">
            <div class="flex items-center">

                <div class="w-20 border-[3px] rounded-full overflow-hidden border-white aspect-square">
                    <img :src="getStorage + user.profileImg" class="w-full h-full object-cover" v-if="user.profileImg"
                        alt="avtar">
                    <div v-html="user.miniAvatar" v-else class="w-full bg-white"></div>
                </div>
                <div class="ml-6">
                    <h1 class="text-white font-bold text-2xl">{{ user.name }}</h1>
                    <p class="text-white font-normal text-lg underline">#{{ user.id }}</p>
                </div>
            </div>
            <!-- <div class="md:flex hidden items-center gap-x-5">
                <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" class="fill-current text-green-400" width="14"
                        viewBox="0 0 320 512">
                        <path
                            d="M318 177.5c3.8-8.8 2-19-4.6-26l-136-144C172.9 2.7 166.6 0 160 0s-12.9 2.7-17.4 7.5l-136 144c-6.6 7-8.4 17.2-4.6 26S14.4 192 24 192H96l0 288c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32l0-288h72c9.6 0 18.2-5.7 22-14.5z" />
                    </svg>
                    <p class="text-white font-bold ml-2 text-xl">12%</p>
                </div>
                <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" class="fill-current text-primary" width="20"
                        viewBox="0 0 512 512">
                        <path
                            d="M453.3 19.3l39.4 39.4c25 25 25 65.5 0 90.5l-52.1 52.1 0 0-1-1 0 0-16-16-96-96-17-17 52.1-52.1c25-25 65.5-25 90.5 0zM241 114.9c-9.4-9.4-24.6-9.4-33.9 0L105 217c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L173.1 81c28.1-28.1 73.7-28.1 101.8 0L288 94.1l17 17 96 96 16 16 1 1-17 17L229.5 412.5c-48 48-109.2 80.8-175.8 94.1l-25 5c-7.9 1.6-16-.9-21.7-6.6s-8.1-13.8-6.6-21.7l5-25c13.3-66.6 46.1-127.8 94.1-175.8L254.1 128 241 114.9z" />
                    </svg>
                    <p class="text-white font-bold ml-2 text-xl">5</p>
                </div>
            </div> -->
        </div>
        <div class=" flex md:justify-end justify-between mt-24 ">
            <!-- <div class="md:hidden items-center gap-x-5 flex">
                <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" class="fill-current text-green-400" width="14"
                        viewBox="0 0 320 512">
                        <path
                            d="M318 177.5c3.8-8.8 2-19-4.6-26l-136-144C172.9 2.7 166.6 0 160 0s-12.9 2.7-17.4 7.5l-136 144c-6.6 7-8.4 17.2-4.6 26S14.4 192 24 192H96l0 288c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32l0-288h72c9.6 0 18.2-5.7 22-14.5z" />
                    </svg>
                    <p class="text-white font-bold ml-2 text-xl">12%</p>
                </div>
                <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" class="fill-current text-primary" width="20"
                        viewBox="0 0 512 512">
                        <path
                            d="M453.3 19.3l39.4 39.4c25 25 25 65.5 0 90.5l-52.1 52.1 0 0-1-1 0 0-16-16-96-96-17-17 52.1-52.1c25-25 65.5-25 90.5 0zM241 114.9c-9.4-9.4-24.6-9.4-33.9 0L105 217c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L173.1 81c28.1-28.1 73.7-28.1 101.8 0L288 94.1l17 17 96 96 16 16 1 1-17 17L229.5 412.5c-48 48-109.2 80.8-175.8 94.1l-25 5c-7.9 1.6-16-.9-21.7-6.6s-8.1-13.8-6.6-21.7l5-25c13.3-66.6 46.1-127.8 94.1-175.8L254.1 128 241 114.9z" />
                    </svg>
                    <p class="text-white font-bold ml-2 text-xl">5</p>
                </div>
            </div> -->
            <Btn class="text-white bg-green-400 font-medium rounded-md text-base flex items-center px-4 py-1.5 text-center"
                v-if="auth.user.role_id == 0 || auth.user.role_id == 1" @click="router.push({ name: 'ProfileEdit' })">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" class="fill-white" width="16" viewBox="0 0 512 512">
                    <path
                        d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                </svg>
                <p class="ml-2"> Edit </p>
            </Btn>
        </div>
    </div>
    <div class="md:px-6 -mt-10">
        <div class="grid 5xl:grid-cols-4 3lg:grid-cols-3 lg:grid-cols-1 2md:grid-cols-2 grid-cols-1 gap-4">
            <div>
                <Donut :data="PerformanceData" pattern="%" title="Performance" class="rounded-sm mb-4"
                    v-if="auth.user.role_id == 2 && PerformanceData.length > 1">
                    {{ average(getPropertyArr(PerformanceData.filter((curr, index) => index != 0), 'data')).toFixed(
                        average(getPropertyArr(PerformanceData.filter((curr, index) => index != 0), 'data')) == 100 ? 0 : 2
                    ) }}%
                </Donut>

                <div class="p-4 border rounded-sm bg-white" :class="user.role_id == 2 ? 'my-4' : ''">
                    <h5 class="text-lg font-semibold mb-4">Info</h5>
                    <div>
                        <div class="grid grid-cols-3 gap-4">
                            <p class="font-semibold">Full Name :</p>
                            <p class="col-start-2 col-end-4 text-gray-400 font-medium">{{ user.name }}</p>
                        </div>
                        <div class="grid grid-cols-3 gap-4 my-2">
                            <p class="font-semibold">Mobile :</p>
                            <p class="col-start-2 col-end-4 text-gray-400 font-medium">{{ user.mobile }}</p>
                        </div>
                        <div class="grid grid-cols-3 gap-4">
                            <p class="font-semibold">E-mail :</p>
                            <p class="col-start-2 col-end-4 text-gray-400 font-medium">{{ user.email }}</p>
                        </div>
                        <div class="grid grid-cols-3 gap-4 my-2">
                            <p class="font-semibold">Gender :</p>
                            <p class="col-start-2 col-end-4 text-gray-400 font-medium">{{ user.gender }}</p>
                        </div>
                        <div class="grid grid-cols-3 gap-4">
                            <p class="font-semibold">Location :</p>
                            <p class="col-start-2 col-end-4 text-gray-400 font-medium">{{ user.city }}, {{ user.country
                                }}</p>
                        </div>
                        <div class="grid grid-cols-3 gap-4 my-2">
                            <p class="font-semibold">Join :</p>
                            <p class="col-start-2 col-end-4 text-gray-400 font-medium">{{ new
                        Date(user.join).toLocaleDateString().replaceAll("/", "-") }}</p>
                        </div>
                    </div>
                </div>
                <div class="p-4 border rounded-sm my-4 bg-white" v-if="user.course.length">
                    <h5 class="text-lg font-semibold mb-4">Course</h5>
                    <div class="flex items-center gap-3 flex-wrap">
                        <p class="px-3 py-1.5 flex items-center gap-2 rounded-[8px] font-medium lg:text-base text-[15px] cursor-pointer"
                            v-for="({ subscribe }, index) in user.course" :key="index"
                            :style="{ color: subscribe.primary_color, backgroundColor: `${subscribe.primary_color}1A` }">
                            {{ subscribe.name }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="3lg:col-start-2 3lg:col-end-5">
                <div class="bg-white rounded-sm p-10 pt-5 border">
                    <h1 class="mb-10 text-lg font-bold">Activity</h1>
                    <ol class="relative border-s border-gray-200 dark:border-gray-700">
                        <li class="mb-10 ms-6" v-for="(result, index) in responce.filter((curr, ind) => ind < 5)"
                            :key="index" v-if="auth.user.role_id == 2 && responce.length">
                            <span
                                class="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -start-3 ring-8 ring-white">
                                <svg class="w-2.5 h-2.5 fill-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </span>
                            <h3 class="flex items-center mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                {{ result.quiz?.title || 'Quiz title' }}
                                <span
                                    class="bg-blue-100 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3 border"
                                    :class="((result.max * 100) / result.max) < 33 ? 'text-red-500 border-red-500' : 'text-success border-success'"
                                    v-if="result.score > 0">{{ ((result.max * 100) / result.max) < 33 ? 'Fail' : 'Pass'
                                        }}</span>
                            </h3>
                            <time
                                class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released
                                on {{ new Date(result.created_at).toLocaleDateString().replaceAll("/", "-") }}</time>
                            <p class="mb-4 ms:text-base text-sm font-normal text-gray-500 dark:text-gray-400"
                                v-if="((result.max * 100) / result.max) > 33">
                                {{ auth.user.name }} get achievement in the field of education and proves that he is
                                great success in <span class="uppercase"> {{ result.course.name }} </span>
                            </p>
                            <p class="mb-4 ms:text-base text-sm font-normal text-gray-500 dark:text-gray-400" v-else>
                                Oops!
                                {{ auth.user.name }} fail in <span class="uppercase"> {{ result.course.name }} </span>
                            </p>

                            <div class="flex items-center gap-4">
                                <button
                                    class="inline-flex items-center px-2.5 py-1.5 text-sm font-medium text-primary bg-primary-50 rounded-lg border border-primary-200"
                                    @click="isShowSingleCerti = true, selectedObj = result">
                                    Get Certificate</button>
                                <button
                                    class="inline-flex items-center px-2.5 py-1.5 text-sm font-medium text-primary bg-primary-50 rounded-lg border border-primary-200"
                                    @click="isShowSingleResult = true, selectedObj = result">
                                    Get Result</button>
                            </div>
                        </li>
                        <li v-else-if="auth.user.role_id == 2 && !responce.length">
                            <p>Data Not Found</p>
                        </li>
                        <li class="mb-10 ms-6" v-for="(result, index) in responce.filter((curr, ind) => ind < 3)"
                            :key="index" v-if="auth.user.role_id != 2 && responce.length">
                            <span
                                class="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -start-3 ring-8 ring-white">
                                <svg class="w-2.5 h-2.5 fill-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </span>
                            <h3 class="flex items-center mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                {{ result.title || 'Quiz title' }}
                            </h3>
                            <time
                                class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released
                                on {{ new Date(result.created_at).toLocaleDateString().replaceAll("/", "-") }}</time>
                            <p class="mb-4 ms:text-base text-sm font-normal text-gray-500 dark:text-gray-400">
                                Quiz for <span class="uppercase"> {{ result.course.name }} </span>
                            </p>

                            <div class="flex items-center">
                                <RouterLink :to="`quiz/details/${result.id}`"
                                    class="inline-flex items-center px-2.5 py-1.5 text-sm font-medium text-primary bg-primary-50 rounded-lg border border-primary-200">
                                    Get Responce</RouterLink>
                            </div>
                        </li>
                        <li v-else-if="auth.user.role_id != 2 && !responce.length">
                            <p>Data Not Found</p>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <CertiModel @close="isShowSingleCerti = null" v-if="isShowSingleCerti" :responceId="isShowSingleCerti"
        :responce="selectedObj" />
    <ResultModel @close="isShowSingleResult = null" v-if="isShowSingleResult" :responceId="isShowSingleResult"
        :responce="selectedObj" />
</template>

<style scoped>
.profile-thubnil {
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://cdn.pixabay.com/photo/2024/01/07/10/59/mountains-8492823_1280.jpg');
}
</style>