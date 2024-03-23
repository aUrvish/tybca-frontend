<script setup >
import { ref, reactive, watch, computed, onMounted } from 'vue'
import { minidenticon } from 'minidenticons'
import { toast } from "vue3-toastify";
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/auth'
import { useLoadStore } from '@/store/loading'
import services from '@/plugins/service'

const { getStaffAction, getStaffSeacherAction } = useAuthStore();
const { changeStatusLoading } = useLoadStore();
const { isLoading } = storeToRefs(useLoadStore());
const { auth } = storeToRefs(useAuthStore());
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
        getStaffAction()
            .then(
                (res) => {
                    if (res.data.data) {
                        teacherList.value = res.data.data;
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
</script>

<template>
    <div class="border rounded-md px-4 pt-6 mt-5">
        <h1 class="text-[20px] font-bold">Staff</h1>

        <div class="grid sm:grid-cols-2 gap-2 pb-4 mt-4">
            <div class="p-2 border rounded-md bg-white hover:bg-gray-100 group" v-for="(teacher, index) in teacherList.filter((curr , index) => index < 7)"
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

                    <div class="grow flex justify-start items-start">
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