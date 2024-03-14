<script setup>
import Textbox from '@/components/Textbox.vue';
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia';
import { useLoadStore } from '@/store/loading'
import debounce from 'lodash.debounce';
import { useCourseStore } from '@/store/course'
const { changeStatusLoading } = useLoadStore();
const { course } = storeToRefs(useCourseStore());
const { getCourse, mutationSetCourse } = useCourseStore();

import { toast } from "vue3-toastify";
import { useQuizStore } from '@/store/quiz'
const { addQuizAction } = useQuizStore();

const props = defineProps({
    quiz: {
        require: true
    }
})
const switchs = ref({
    schedule: false,
    nagative : false 
})
const quizObj = ref(props.quiz)
onMounted(
    () => {
        addCourse(quizObj.value.course);
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

watch(
    quizObj.value,
    debounce((newX) => {

        let payload = {
            id : props.quiz.id,
            certi_signature : quizObj.value.certi_signature,
            certi_stamp : quizObj.value.certi_stamp,
            course_id : quizObj.value.course_id,
            duration : quizObj.value.duration,
            is_notify : quizObj.value.is_notify,
            is_random : quizObj.value.is_random,
            nagative_point : quizObj.value.nagative_point,
            start_at : quizObj.value.start_at,
            title : quizObj.value.title,
        }

        changeStatusLoading(true)
        addQuizAction(payload)
            .then(
                (res) => {
                    if (res.data.data) {
                        quizObj.value = res.data.data
                        console.log(quizObj.value);
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
    }, 800)
)

const selectCourse = ref(null);

const addCourse = (obj) => {
    selectCourse.value = obj.id
    quizObj.value.course_id = obj.id
}
</script>
<template>
    <div class="grid sm:grid-cols-2 gap-4">
        <div>

            <div class="border bg-white p-4 rounded-md">
                <div class="flex justify-between items-center">
                    <p class="text-lg text-gray-600 font-semibold">Schedule</p>
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="switchs.schedule" class="sr-only peer">
                        <div
                            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue">
                        </div>
                    </label>
                </div>
                <hr class="my-5">
                <p class="text-gray-400 italic font-normal text-sm mb-4">Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Commodi aut explicabo harum corporis tenetur libero sequi vitae </p>

                <div v-if="switchs.schedule" >
                    <div>
                        <p class="text-gray-400 font-normal">Time :</p>
                        <input type="datetime-local" class="mt-2 border rounded-md py-2 px-4 w-full">
                    </div>
                    <div class="mt-4">
                        <p class="text-gray-400 font-normal">Duration :</p>
                        <select id="countries"
                            class="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                            <option selected>Choose a country</option>
                            <option value="30">30 Minutes</option>
                            <option value="1">1 Hours</option>
                            <option value="2">2 Hours</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="border bg-white p-4 rounded-md mt-4">
                <h5 class="text-lg font-semibold mb-4">Course</h5>
                <div class="flex items-center gap-3 flex-wrap">
                    <p class="px-3 py-1.5 flex items-center gap-2 bg-[#BD39FC1A] rounded-[8px] font-medium lg:text-base text-[15px] text-[#BD39FC] cursor-pointer"
                        @click="addCourse(course), $emit('changeCourse', course)" v-for="(course, index) in course"
                        :key="index"
                        :style="{ color: course.primary_color, backgroundColor: `${course.primary_color}1A` }">
                        <svg xmlns="http://www.w3.org/2000/svg" v-if="selectCourse == course.id"
                            class="w-full max-w-3 fill-current" viewBox="0 0 448 512">
                            <path
                                d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                        </svg>
                        {{ course.name }}
                    </p>
                </div>
            </div>
        </div>

        <div>
            <div class="border bg-white p-4 rounded-md">
                <div class="flex justify-between items-center">
                    <p class="text-lg text-gray-600 font-semibold">Random Question Indexing</p>
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" @change="quizObj.is_random = $event.target.checked" :checked="quizObj.is_random == 1" class="sr-only peer">
                        <div
                            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue">
                        </div>
                    </label>
                </div>
                <hr class="my-5">
                <p class="text-gray-400 italic font-normal text-sm mb-4">Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Commodi aut explicabo harum corporis tenetur libero sequi vitae </p>
            </div>
            <div class="border bg-white p-4 rounded-md mt-4">
                <div class="flex justify-between items-center">
                    <p class="text-lg text-gray-600 font-semibold">Quiz Notify</p>
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" @change="quizObj.is_notify = $event.target.checked" :checked="quizObj.is_notify == 1" class="sr-only peer">
                        <div
                            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue">
                        </div>
                    </label>
                </div>
                <hr class="my-5">
                <p class="text-gray-400 italic font-normal text-sm mb-4">Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Commodi aut explicabo harum corporis tenetur libero sequi vitae </p>
            </div>
            <div class="border bg-white p-4 rounded-md mt-4">
                <div class="flex justify-between items-center">
                    <p class="text-lg text-gray-600 font-semibold">Nagetive Point</p>
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="switchs.nagative" class="sr-only peer">
                        <div
                            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue">
                        </div>
                    </label>
                </div>
                <hr class="my-5">
                <p class="text-gray-400 italic font-normal text-sm mb-4">Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Commodi aut explicabo harum corporis tenetur libero sequi vitae </p>
                <div class="flex justify-between items-center" v-if="switchs.nagative">
                    <p class="text-gray-400 font-normal">Points :</p>
                    <input type="number"
                        class="bg-gray-50 border max-w-[150px] border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="1" />
                </div>
            </div>
        </div>
    </div>
</template>