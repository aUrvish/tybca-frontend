<script setup>
import Textbox from '@/components/Textbox.vue';
import { onMounted, reactive, ref, watch } from 'vue'
import { storeToRefs } from 'pinia';
import { useLoadStore } from '@/store/loading'
import debounce from 'lodash.debounce';
import { useCourseStore } from '@/store/course'
const { changeStatusLoading } = useLoadStore();
const { course } = storeToRefs(useCourseStore());
const { getCourse, mutationSetCourse } = useCourseStore();
import services from '@/plugins/service'

import { toast } from "vue3-toastify";
import { useQuizStore } from '@/store/quiz'
const { addQuizAction } = useQuizStore();
const getStorage = services.storageBaseUrl;

const props = defineProps({
    quiz: {
        require: true
    }
})
const switchs = ref({
    schedule: false,
    nagative: false,
    certificate: false,
})
const quizObj = reactive(props.quiz)
onMounted(
    () => {
        addCourse(quizObj.course);
        switchs.value.schedule = quizObj.start_at;
        switchs.value.nagative = quizObj.nagative_point;
        switchs.value.certificate = quizObj.certi_signature != null;
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

let formData = new FormData()
watch(
    quizObj,
    debounce((newX) => {
        console.log(newX);
        formData.append('id' , props.quiz.id)
        formData.append('certi_signature' , quizObj.certi_signature)
        formData.append('course_id' , quizObj.course_id)
        formData.append('duration' , quizObj.duration)
        formData.append('is_notify' , quizObj.is_notify)
        formData.append('is_random' , quizObj.is_random)
        formData.append('nagative_point' , quizObj.nagative_point)
        formData.append('start_at' , quizObj.start_at)
        formData.append('title' , quizObj.title)

        changeStatusLoading(true)
        addQuizAction(formData)
            .then(
                (res) => {
                    if (res.data.data) {
                        let data = res.data.data

                        quizObj.certi_signature = data.certi_signature;
                        // quizObj.certi_stamp = data.certi_stamp;
                        quizObj.course_id = data.course_id;
                        quizObj.duration = data.duration;
                        quizObj.is_notify = data.is_notify;
                        quizObj.is_random = data.is_random;
                        quizObj.nagative_point = data.nagative_point;
                        quizObj.title = data.title;
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
    }, 800)
)

const selectCourse = ref(null);

const addCourse = (obj) => {
    selectCourse.value = obj.id
    quizObj.course_id = obj.id
}

const uploadTitleImage = (value) => {
    let url = URL.createObjectURL(value.files[0])
    quizObj.titleImg = url
    quizObj.certi_signature = value.files[0]
}

const cleareTitleImage = () => {
    quizObj.titleImg = null
    quizObj.certi_signature = null
}
</script>
<template>
    <div class="grid sm:grid-cols-2 gap-4">
        <div>

            <div class="border bg-white p-4 rounded-md">
                <div class="flex justify-between items-center">
                    <p class="text-lg text-gray-600 font-semibold">Schedule</p>
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" @change="switchs.schedule = !switchs.schedule, quizObj.start_at = null"
                            :checked="switchs.schedule || switchs.schedule == 1" class="sr-only peer">
                        <div
                            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue">
                        </div>
                    </label>
                </div>
                <hr class="my-5">
                <p class="text-gray-400 italic font-normal text-sm mb-4">Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Commodi aut explicabo harum corporis tenetur libero sequi vitae </p>

                <div v-if="switchs.schedule">
                    <div>
                        <p class="text-gray-400 font-normal">Time :</p>
                        <input type="datetime-local" v-model="quizObj.start_at"
                            class="mt-2 border rounded-md py-2 px-4 w-full">
                    </div>
                    <div class="mt-4">
                        <p class="text-gray-400 font-normal">Duration :</p>
                        <select id="countries" v-model="quizObj.duration"
                            class="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                            <option selected :value="null">Choose a Duration</option>
                            <option value="30">30 Minutes</option>
                            <option value="60">1 Hours</option>
                            <option value="120">2 Hours</option>
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
                        <input type="checkbox" @change="quizObj.is_random = $event.target.checked"
                            :checked="quizObj.is_random == 1" class="sr-only peer">
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
                        <input type="checkbox" @change="quizObj.is_notify = $event.target.checked"
                            :checked="quizObj.is_notify == 1" class="sr-only peer">
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
                        <input type="checkbox" class="sr-only peer"
                            @change="switchs.nagative = !switchs.nagative, quizObj.nagative_point = 0"
                            :checked="switchs.nagative != 0">
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
                        v-model="quizObj.nagative_point" placeholder="1" />
                </div>
            </div>
            <div class="border bg-white p-4 rounded-md mt-4">
                <div class="flex justify-between items-center">
                    <p class="text-lg text-gray-600 font-semibold">Render Certificate</p>
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" class="sr-only peer"
                            @change="switchs.certificate = !switchs.certificate, quizObj.certi_signature = ''"
                            :checked="switchs.certificate">
                        <div
                            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue">
                        </div>
                    </label>
                </div>
                <hr class="my-5">
                <p class="text-gray-400 italic font-normal text-sm mb-4">Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Commodi aut explicabo harum corporis tenetur libero sequi vitae {{ switchs.certificate }} </p>
                <div class="flex justify-between items-center" v-if="switchs.certificate">
                    <div class="mt-4 relative" v-if="quizObj && (quizObj.certi_signature || quizObj.titleImg)">
                        <div class="py-1 px-1.5 bg-red-400 aspect-square absolute rounded-full cursor-pointer translate-x-1/2 -translate-y-1/2 right-0"
                            @click="cleareTitleImage()">
                            <svg xmlns="http://www.w3.org/2000/svg" class="max-w-2.5 w-full fill-gray-200"
                                viewBox="0 0 384 512">
                                <path
                                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                        </div>
                        <img :src="quizObj.titleImg ? quizObj.titleImg : quizObj.certi_signature ? getStorage + quizObj.certi_signature : ''"
                            class="w-full rounded-md border" alt="blob image">
                    </div>
                    <input type="file" @change="(e) => uploadTitleImage(e.target)" v-else>
                </div>
            </div>
        </div>
    </div>
</template>