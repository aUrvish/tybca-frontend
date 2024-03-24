<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { toast } from "vue3-toastify";
import { storeToRefs } from 'pinia';
import { useLoadStore } from '@/store/loading'
import { useQuizStore } from '@/store/quiz'
import debounce from 'lodash.debounce';
import services from '@/plugins/service'

const { changeStatusLoading } = useLoadStore();
const { addQuestionAction, addQuestionInputAction, removeQuestionAction, removeQuestionInputAction } = useQuizStore();
const { isLoading } = storeToRefs(useLoadStore());

const emit = defineEmits(['changeQue'])
const props = defineProps({
    data: {
        default: []
    },
    quiz: {
        require: true
    }
})

const getStorage = services.storageBaseUrl;
const isDropDownShow = ref([false]);
const dropItem = ref(['options', 'numeric', 'checkboxes'])
const mediaOnTitle = ref(null)

const questions = ref(
    [...props.data]
);

const dropdownToggle = (index) => {
    isDropDownShow.value[index] = !isDropDownShow.value[index]
}
const dropdownClose = (index) => {
    isDropDownShow.value[index] = false
}
const setDropdownItem = (index, value) => {
    questions.value[index].type = value

    for (let i = 0; i < isDropDownShow.value.length; i++) {
        isDropDownShow.value[i] = false
    }
}

const addOption = (que_id, index) => {
    changeStatusLoading(true)
    let payload = {
        quiz_id: props.quiz.id,
        question_id: que_id,
        name: 'Option',
    }
    addQuestionInputAction(payload)
        .then(
            (res) => {
                if (res.data.data) {
                    let data = res.data.data;

                    if (data) {
                        questions.value[index].inputs.push(data);
                    }
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

const removeOption = (optId, queIndex, optIndex) => {

    removeQuestionInputAction(optId)
        .then(
            (res) => {
                if (res.data.status) {
                    questions.value[queIndex].inputs.splice(optIndex, 1);
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

const addQuestion = () => {

    changeStatusLoading(true)
    let payload = {
        quiz_id: props.quiz.id,
        title: 'Multiple Choice Question',
        type: 'options',
        stand_index: questions.value.length
    }
    addQuestionAction(payload)
        .then(
            (res) => {
                if (res.data.data) {
                    let data = res.data.data;

                    if (data) {
                        questions.value.push(data)
                        isDropDownShow.value.push(false)
                    }
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

const sum = (arr) => arr.reduce((p, c) => p + c, 0) || 0;

watch(questions.value,
    debounce((newX) => {
        let findSumofPoint = sum([...questions.value.map((curr, index) => curr.point || 0)])
        emit('changeQue', findSumofPoint, questions.value.length)

        newX.map(
            (ques, index) => {

                let formData = new FormData();
                formData.append('id' , ques.id)
                formData.append('quiz_id' , props.quiz.id)
                formData.append('title' , ques.title)
                formData.append('type' , ques.type)
                formData.append('stand_index' , ques.stand_index)
                formData.append('point' , ques.point)
                formData.append('is_required' , ques.is_required)
                formData.append('img' , ques.img)
                // change question
                changeStatusLoading(true)
                addQuestionAction(formData)
                    .then(
                        (res) => {
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

                // change option
                ques.inputs.map(
                    (option) => {
                        changeStatusLoading(true)
                        let payloadOption = {
                            id: option.id,
                            quiz_id: props.quiz.id,
                            question_id: ques.id,
                            name: option.name,
                            is_answer : option.is_answer
                        }
                        addQuestionInputAction(payloadOption)
                            .then(
                                (res) => {
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

            }
        )
    }, 800)
)

const removeQuestion = (queId, index) => {

    removeQuestionAction(queId)
        .then(
            (res) => {
                if (res.data.status) {
                    questions.value.splice(index, 1);
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

const is_answerOption = (queIndex, optIndex) => {
    questions.value[queIndex].inputs[optIndex].is_answer = !questions.value[queIndex].inputs[optIndex].is_answer
}

const chandeDragIndex = (e) => {
    questions.value[e.newIndex].stand_index = e.newIndex
    questions.value[e.oldIndex].stand_index = e.oldIndex
}

const clickOnTitleMedia = (index) => {
    mediaOnTitle.value[index].click();
}

const uploadTitleImage = (index, value) => {
    let url = URL.createObjectURL(value.files[0])
    questions.value[index].titleImg = url
    questions.value[index].img = value.files[0]
}

const cleareTitleImage = (index) => {
    questions.value[index].titleImg = null
    questions.value[index].img = null
}

onMounted(
    () => {
        let findSumofPoint = sum([...questions.value.map((curr, index) => curr.point || 0)])
        emit('changeQue', findSumofPoint, questions.value.length)
    }
)
</script>

<template>
    <div class="max-w-screen-lg mx-auto">
        <VueDraggableNext v-model="questions" @end="chandeDragIndex" :delay="100">
            <transition-group type="transition" name="fade">
                <div class="md:px-10 px-0 mb-4 relative select-none" v-for="(que, index) in questions"
                    :key="que.stand_index">
                    <div class="p-5 border border-l-[5px] border-l-primary bg-white rounded-lg  cursor-move group">
                        <p
                            class="absolute left-0 top-0 md:text-[32px] text-2xl font-bold text-primary translate-x-4 md:-translate-x-1/4  md:translate-y-1/2 translate-y-1/4 md:block hidden">
                            {{ index +
            1 }}</p>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="max-w-6 fill-gray-400 absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 invisible group-hover:visible md:block hidden"
                            viewBox="0 0 448 512">
                            <path
                                d="M32 288c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 288zm0-128c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 160z" />
                        </svg>
                        <div class="flex md:flex-row flex-col justify-between md:items-center gap-4">
                            <div class="flex items-center gap-3 grow">
                                <p class="md:text-[32px] text-2xl font-bold text-primary md:hidden">
                                    {{ index +
            1 }}</p>
                                <div class="flex justify-between items-center w-full">
                                    <div>
                                        <input type="text" class="md:text-lg font-semibold outline-0 w-full"
                                            v-model="questions[index].title">
                                        <p class="text-gray-400 text-sm -mt-1">Title</p>
                                        <input type="file" class="w-0 h-0 hidden" ref="mediaOnTitle"
                                            @change="(e) => uploadTitleImage(index, e.target)">
                                    </div>

                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="md:max-w-5 max-w-5 cursor-pointer fill-gray-400" viewBox="0 0 512 512"
                                        @click="clickOnTitleMedia(que.stand_index)">
                                        <path
                                            d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
                                    </svg>
                                </div>
                            </div>
                            <!-- v-click-outside="() => isDropIndex = index" -->
                            <div class="md:max-w-48 w-full relative select-none z-10"
                                v-click-outside="() => dropdownClose(que.stand_index)">
                                <div class="flex justify-between items-center cursor-pointer border py-1.5 px-3 rounded-md"
                                    @click="dropdownToggle(que.stand_index)">
                                    <h5 class="capitalize">{{ que.type }}</h5>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="max-w-2.5 fill-gray-400"
                                        viewBox="0 0 320 512">
                                        <path
                                            d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                                    </svg>
                                </div>
                                <ul class="absolute mt-3 rounded-md bg-white border p-1.5 w-full"
                                    :class="isDropDownShow[que.stand_index] ? '' : 'hidden'">
                                    <li class="py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer capitalize"
                                        v-for="(item, ind) in dropItem" :key="ind"
                                        @click="setDropdownItem(index, item)">{{
            item
        }}
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="mt-4 relative" v-if="que && (que.img || que.titleImg)">
                            <div class="py-1 px-1.5 bg-red-400 aspect-square absolute rounded-full cursor-pointer translate-x-1/2 -translate-y-1/2 right-0"
                                @click="cleareTitleImage(index)">
                                <svg xmlns="http://www.w3.org/2000/svg" class="max-w-2.5 w-full fill-gray-200"
                                    viewBox="0 0 384 512">
                                    <path
                                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                </svg>
                            </div>
                            <img :src="que.titleImg ? que.titleImg : que.img ? getStorage + que.img : ''" class="w-full rounded-md border" alt="blob image">
                        </div>

                        <div class="grid md:grid-cols-2 md:gap-5 gap-3 mt-6">
                            <div class="flex items-center justify-between border rounded-md py-3 px-4 group-option"
                                v-for="(option, ind) in que.inputs" :key="ind"
                                :class="option.is_answer ? 'border-green-400' : ''">
                                <div class="grow items-center flex">
                                    <input :name="`que${index}`" type="radio" class="w-4 h-4"
                                        v-if="que.type == 'options'" :checked="ind == 0" disabled>
                                    <input :name="`que${index}`" type="checkbox" class="w-4 h-4"
                                        v-else-if="que.type == 'checkboxes'" :checked="ind == 0" disabled>
                                    <p class="font-semibold text-gray-500" v-else>{{ ind +1 }}.</p>
                                    <input class="ml-3 outline-0 w-full" v-model="option.name">
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                    class="max-w-4 ml-3 cursor-pointer group-option-svg invisible" :class="option.is_answer
            ? 'fill-green-400' : 'fill-gray-300'" @click="is_answerOption(index, ind)">
                                    <path
                                        d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="max-w-4 ml-3 fill-gray-400 cursor-pointer group-option-svg invisible"
                                    viewBox="0 0 384 512" @click="removeOption(option.id, index, ind)">
                                    <path
                                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                </svg>
                            </div>
                            <div class="flex items-center cursor-pointer" @click="addOption(que.id, index)">
                                <svg xmlns="http://www.w3.org/2000/svg" class="max-w-5 fill-gray-400"
                                    viewBox="0 0 512 512">
                                    <path
                                        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                                </svg>
                                <p class="text-sm ml-2 text-gray-400">Add more</p>
                            </div>
                        </div>

                        <div class="md:mt-10 mt-6 flex items-center justify-between gap-5">
                            <div class="flex items-center">
                                <input type="number" maxlength="1" size="1" min="0" max="9"
                                    class="h-5 outline-0 border-b w-7 mr-2 md:text-base text-sm" id="require1"
                                    v-model="questions[index].point">
                                <label for="require1" class="md:text-base text-sm">Points</label>
                            </div>
                            <div class="flex gap-5 items-center">
                                <div class="flex items-center">
                                    <input type="checkbox" class="md:h-5 md:w-5 h-4 w-4 mr-2" id="require1"
                                        :checked="que.is_required == 1"
                                        @change="questions[index].is_required = $event.target.checked">
                                    <label for="require1" class="md:text-base text-sm">Required</label>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="md:max-w-4 max-w-3 w-full fill-red-400 cursor-pointer" viewBox="0 0 448 512"
                                    @click="removeQuestion(que.id, index)">
                                    <path
                                        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </transition-group>
        </VueDraggableNext>
        <div class="md:px-10">
            <div class="border-4 border-dashed md:py-10 py-4 grid place-items-center cursor-pointer border-primary rounded-md"
                @click="addQuestion()">
                <svg xmlns="http://www.w3.org/2000/svg" class="max-w-10 fill-primary" viewBox="0 0 448 512">
                    <path
                        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
            </div>
        </div>
    </div>
</template>