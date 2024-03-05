<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue'
import Textbox from '@/components/Textbox.vue';
import Btn from '@/components/Btn.vue';
import { storeToRefs } from 'pinia';
import { useLoadStore } from '@/store/loading'
import { useCourseStore } from '@/store/course'
const { changeStatusLoading } = useLoadStore();
const { isLoading } = storeToRefs(useLoadStore());
const { course } = storeToRefs(useCourseStore());
const { getCourse, mutationSetCourse } = useCourseStore();

onMounted(
    () => {
        changeStatusLoading(true)
        getCourse()
            .then(
                (res) => {
                    mutationSetCourse(res.data.data)
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

const selectFilter = ref(null);
</script>

<template>
    <div class="p-4 border rounded-md bg-white" v-if="course">
        <h5 class="text-lg font-semibold mb-4">Filter by Cource</h5>

        <div class="flex items-center gap-3 flex-wrap">
            <p class="px-3 py-1.5 flex items-center gap-2 rounded-[8px] font-medium lg:text-base text-[15px] cursor-pointer"
                @click="selectFilter = courseData.id" v-for="(courseData, index) in course" :key="index"
                :style="{ color: selectFilter == courseData.id ? '#fff' : courseData.primary_color, 
                    backgroundColor: selectFilter == courseData.id ? courseData.primary_color : `${courseData.primary_color}1A` }">
                {{ courseData.name }}
            </p>
            <p
                class="px-3 py-1.5 w-full text-center bg-gray-100 rounded-[8px] font-medium lg:text-base text-[15px] text-gray-500 cursor-pointer" @click="selectFilter = null">
                All</p>
        </div>
    </div>
</template>