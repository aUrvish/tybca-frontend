<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import { useCourseStore } from '@/store/course'
import { useLoadStore } from '@/store/loading'
import { toast } from "vue3-toastify";

const { getCourse } = useCourseStore();
const { changeStatusLoading } = useLoadStore();

const course = ref([])

onMounted(
    () => {
        changeStatusLoading(true)

        getCourse()
            .then(
                (res) => {
                    changeStatusLoading(false)
                    let response = res.data.data;
                    if (response) {
                        console.log(response);
                        course.value = response
                    }
                }
            )
            .catch(
                (e) => {
                    toast(e.response.data.message, {
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
    <div 
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full bg-[#00000080]">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-lg h-auto">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow ">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                    <h3 class="text-xl font-semibold text-gray-900 ">
                        Courses
                    </h3>
                    <button type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " @click="$emit('close')"
                        data-modal-hide="default-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-4 md:p-5 space-y-4">
                    <div class="flex items-center gap-3 flex-wrap">
                        <p class="px-3 py-1.5 flex items-center gap-2 rounded-[8px] font-medium lg:text-base text-[15px] cursor-pointer"
                            v-for="( subscribe, index) in course" :key="index"
                            :style="{ color: subscribe.primary_color, backgroundColor: `${subscribe.primary_color}1A` }">
                            {{ subscribe.name }}
                        </p>
                    </div>
                </div>
                <!-- Modal footer -->
                <div class="flex items-center justify-end p-4 md:p-4 border-t border-gray-200 rounded-b ">
                    <button @click="$emit('close')" type="button"
                        class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>