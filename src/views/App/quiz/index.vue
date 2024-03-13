<script setup>
import Btn from '@/components/Btn.vue'
import QuizTable from './components/QuizTable.vue';
import { storeToRefs } from 'pinia';
import { useCourseStore } from '@/store/course'
import { useLoadStore } from '@/store/loading'
import { computed, onMounted, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { toast } from "vue3-toastify";
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth'
import { useQuizStore } from '@/store/quiz'
import DeleteConfirm from '@/components/DeleteConfirm.vue';

const { course } = storeToRefs(useCourseStore());
const { addCourse, removeCourse, getCourse, mutationRemoveCourse, mutationSetCourse } = useCourseStore();
const { changeStatusLoading } = useLoadStore();
const { isLoading } = storeToRefs(useLoadStore());
const { addQuizAction } = useQuizStore();
const { auth } = storeToRefs(useAuthStore());

const router = useRouter()

const createQuiz = () => {

    let payload = {
        title : "Quiz title",
    }

    changeStatusLoading(true)
    addQuizAction(payload)
        .then(
            (res) => {
                if (res.data.data) {   
                    router.push(`quiz/details/${res.data.data.id}`)
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

const courseInput = ref(
    {
        id: null,
        input: null,
        type: "Add",
    }
);

const selectedId = ref(null)

const rules = computed(() => {
    return {
        input: { required },
    }
})

const v$ = useVuelidate(rules, courseInput)

const submitCourse = () => {
    v$.value.$validate();
    if (v$.value.$invalid) {
        return null
    }

    changeStatusLoading(true)

    let payload = {
        id: courseInput.value.id,
        name: courseInput.value.input,
    }
    addCourse(payload)
        .then(
            (res) => {
                toast(res.data.messages, {
                    "type": res.data.status ? "success" : "error",
                    "dangerouslyHTMLString": true
                })
                mutationSetCourse(res.data.data)
            }
        )
        .catch(
            (e) => {
                toast(e.response.data.messages, {
                    "type": "error",
                    "dangerouslyHTMLString": true
                })
            }
        )
        .finally(
            () => {
                changeStatusLoading(false)
                courseInput.value.input = null;
                courseInput.value.id = null;
                courseInput.value.type = 'Add';
                v$.value.$reset()
            }
        )
}

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

const removeCourseConfirmation = (id) => {
    selectedId.value = id
}

const removeCourseFunc = (id) => {
    courseInput.value.input = null;
    courseInput.value.id = null;
    courseInput.value.type = 'Add';

    changeStatusLoading(true)
    removeCourse(id)
        .then(
            (res) => {
                toast(res.data.messages, {
                    "type": res.data.status ? "success" : "error",
                    "dangerouslyHTMLString": true
                })
                mutationRemoveCourse(id)
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
        .finally(
            () => {
                selectedId.value = null
            }
        )
}


const updateCourse = (change_course) => {
    courseInput.value.input = change_course.name;
    courseInput.value.id = change_course.id;
    courseInput.value.type = 'Change';
}
</script>

<template>
    <div class="grid gap-4 grid-cols-4 overflow-hidden">
        <div class="col-start-1 xl:col-span-3 col-span-4">
            <div class="border rounded-md bg-white p-4 flex items-center justify-between">
                <h1 class="text-[24px] font-semibold">Quiz</h1>
                <div>
                    <!-- <RouterLink :to="{ name: 'QuizDetails' }" 
                        class="text-white bg-gray-950 font-medium rounded-md text-sm px-4 py-2 text-center">
                        Create Quiz
                    </RouterLink> -->

                    <Btn class="text-white bg-gray-950 font-medium rounded-md text-sm px-4 py-2 text-center"  @click="createQuiz">
                        Create Quiz
                    </Btn>
                </div>
            </div>

            <div class="mt-4 md:hidden">
                <div class="p-4 border rounded-md bg-white">
                    <h5 class="text-lg font-semibold mb-4">Course</h5>

                    <div class="flex justify-between items-start gap-2 mb-6">
                        <div class="grow">
                            <input type="text" id="first_name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                                placeholder="i.g IT" v-model="courseInput.input">
                            <p class="text-sm mt-1 text-red-500" v-if="v$.$dirty && v$.input.$invalid"> <span
                                    class="font-bold text-base">!</span> Course name is required</p>
                        </div>

                        <Btn class="text-white bg-gray-950 font-medium rounded-md text-sm px-4 py-2 text-center"
                            @click="submitCourse">
                            {{ courseInput.type }}
                        </Btn>
                    </div>

                    <div class="flex items-center gap-3 flex-wrap">
                        <p class="px-3 py-1.5 rounded-[8px] font-medium cursor-pointer lg:text-base text-[15px] flex gap-2 items-center"
                            v-for="(course, index) in course" :key="index"
                            :style="{ color: course.primary_color, backgroundColor: `${course.primary_color}1A` }">
                            <span @click="updateCourse(course)">{{ course.name }}</span>

                            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 fill-current" viewBox="0 0 384 512"
                                @click.stop="removeCourseConfirmation(course.id)">
                                <path
                                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                        </p>
                    </div>
                </div>
            </div>
            <QuizTable :max="10" />
        </div>
        <div class="xl:block hidden">
            <div class="p-4 border rounded-md bg-white">
                <h5 class="text-lg font-semibold mb-4">Course</h5>

                <div class="flex justify-between items-start gap-2 mb-6">
                    <div class="grow">
                        <input type="text" id="first_name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                            placeholder="i.g IT" v-model="courseInput.input">
                        <p class="text-sm mt-1 text-red-500" v-if="v$.$dirty && v$.input.$invalid"> <span
                                class="font-bold text-base">!</span> Course name is required</p>
                    </div>

                    <Btn type="submit"
                        class="flex justify-center items-center gap-3 text-white font-medium rounded-md text-sm px-5 py-2 text-center"
                        @click="submitCourse" :class="isLoading ? 'bg-gray-700' : 'bg-gray-950'" :disabled="isLoading">
                        {{ courseInput.type }}
                        <svg aria-hidden="true" v-if="isLoading" class="w-5 h-5 text-white animate-spin fill-gray-950"
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

                <div class="flex items-center gap-3 flex-wrap">
                    <p class="px-3 py-1.5 rounded-[8px] font-medium lg:text-base cursor-pointer text-[15px] flex gap-2 items-center"
                        v-for="(course, index) in course" :key="index"
                        :style="{ color: course.primary_color, backgroundColor: `${course.primary_color}1A` }">
                        <span @click="updateCourse(course)"> {{ course.name }}</span>

                        <svg xmlns="http://www.w3.org/2000/svg" class="w-3 fill-current" viewBox="0 0 384 512"
                            @click="removeCourseConfirmation(course.id)">
                            <path
                                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                    </p>
                </div>

            </div>
        </div>
    </div>
    <DeleteConfirm v-if="selectedId" @delete="removeCourseFunc(selectedId)" @close="selectedId = null" />
</template>