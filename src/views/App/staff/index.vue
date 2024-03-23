<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue'
import { minidenticon } from 'minidenticons'
import { toast } from "vue3-toastify";
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/auth'
import { useLoadStore } from '@/store/loading'
import debounce from 'lodash.debounce'

const { getStaffAction, getStaffSeacherAction } = useAuthStore();
const { changeStatusLoading } = useLoadStore();
const { isLoading } = storeToRefs(useLoadStore());
const { auth } = storeToRefs(useAuthStore());
import services from '@/plugins/service'
const getStorage = services.storageBaseUrl;


const teacherList = ref([])
const pagination = ref(1)
const miniavtar = (name) => {
    return minidenticon(name)
}

const selectedId = ref(null)

onMounted(
    () => {
        changeStatusLoading(true)
        getStaffAction(pagination.value)
            .then(
                (res) => {
                    if (res.data.data) {
                        teacherList.value = res.data.data.filter(
                            (curr) => curr.id != auth.value.user.id 
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

const search = ref(null)

watch(search,
    debounce((newVal) => {

        changeStatusLoading(true)
        getStaffSeacherAction({ search: newVal })
            .then(
                (res) => {
                    teacherList.value = res.data.data;
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

    }, 800)
)
</script>
<template>
    <div class="max-w-screen-xl mx-auto">
        <div class="bg-white relative border sm:rounded-lg overflow-hidden rounded-md">
            <div class="flex items-center justify-between p-4">
                <h1 class="text-[20px] font-bold">Teachers</h1>
                <div class="w-full sm:max-w-[300px] max-w-[150px]">
                    <form class="flex items-center">
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
                                placeholder="Search" v-model="search">
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="grid xl:grid-cols-3 sm:grid-cols-2 gap-2 pb-4 mt-4">
            <div class="p-2 border rounded-md bg-white hover:bg-gray-100 group" v-for="(teacher, index) in teacherList"
                :key="index">
                <div class="flex justify-between items-center gap-4">

                    <div class="w-14 aspect-square overflow-hidden relative">
                        <div
                            class="absolute z-10 bg-success border-2 border-white w-4 right-0 bottom-0 aspect-square rounded-full" v-if="teacher.status == 1">
                        </div>
                        <img :src="getStorage + teacher.avatar" class="object-cover w-full h-full rounded-full border"
                            v-if="teacher.avatar" alt="avtar">
                        <div v-html="miniavtar(teacher.name)" v-else class="w-full rounded-full border bg-white"></div>
                    </div>

                    <div class="grow flex justify-between items-start">
                        <div class="grow">
                            <p class="text-gray-400 font-semibold">{{ teacher.name }}</p>
                            <p class="text-sm text-gray-400 font-semibold group-hover:underline">#{{ teacher.id }}</p>
                        </div>
                    </div>
                </div>

                <div v-if="teacher.course.length" >
                    <hr class="my-4 opacity-70">
                    <div class="flex items-center gap-2 flex-wrap">
                        <p class="px-2 py-1 flex items-center gap-2 rounded-[8px] font-medium lg:text-sm text-[12px] cursor-pointer"
                             v-for="({subscribe}, index) in teacher.course" :key="index"
                            :style="{ color: subscribe.primary_color, backgroundColor: `${subscribe.primary_color}1A` }">
                            {{ subscribe.name }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>