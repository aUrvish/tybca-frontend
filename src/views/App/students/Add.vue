<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue'
import Textbox from '@/components/Textbox.vue';
import Btn from '@/components/Btn.vue';
import { minidenticon } from 'minidenticons'
import { storeToRefs } from 'pinia';
import { useVuelidate } from '@vuelidate/core'
import { required, email, numeric } from '@vuelidate/validators'
import { useAuthStore } from '@/store/auth'
import { useLoadStore } from '@/store/loading'
import { toast } from "vue3-toastify";
import { useCourseStore } from '@/store/course'

const { registerAction } = useAuthStore();
const { changeStatusLoading } = useLoadStore();
const { auth } = storeToRefs(useAuthStore());
const { isLoading } = storeToRefs(useLoadStore());
const { course } = storeToRefs(useCourseStore());
const { getCourse, mutationSetCourse } = useCourseStore();

const user = reactive({
    name: "ronak",
    email: "ronak@gmail.com",
    gender: 1,
    mobile: 9797979797,
    city: "mumbai",
    country: "india",
})

const rules = computed(() => {
    return {
        name: { required },
        email: { required, email },
        mobile: { required, numeric },
        city: { required },
        country: { required },
    }
})

const v$ = useVuelidate(rules, user)

const userMiniprofile = ref(null)
const form = ref(null)
const avatarImg = ref(null)

const changeImg = (value) => {
    avatarImg.value = URL.createObjectURL(value.files[0]);
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

watch(
    () => user.name,
    (newVal) => {
        userMiniprofile.value = minidenticon(newVal)
    }
)

const selectCourse = ref([]);

const addCourse = (obj) => {
    if (selectCourse.value.includes(obj.id)) {
        selectCourse.value = selectCourse.value.filter((curr, index) => curr != obj.id)
        return null;
    }
    selectCourse.value.push(obj.id);
}

const profileImage = ref(null);

const addUser = () => {

    v$.value.$validate();
    if (v$.value.$invalid) {
        return null
    }

    changeStatusLoading(true)

    let formData = new FormData(form.value);

    registerAction(formData)
        .then(
            (res) => {
                toast(res.data.messages, {
                    "type": res.data.status ? "success" : "error",
                    "dangerouslyHTMLString": true
                })
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
</script>

<template>
    <form @submit.prevent="addUser" ref="form">
        <div class="flex gap-4 items-start flex-col 3lg:flex-row max-w-screen-xl mx-auto">
            <div class="grow w-full">
                <div class="border rounded-md bg-white p-4 mb-4">
                    <h1 class="text-[24px] font-semibold">Student</h1>
                </div>
                <div class="border rounded-md bg-white sm:p-6 p-4">
                    <div
                        class="w-40 group aspect-square border-2 relative rounded-full grid place-items-center bg-white mx-auto overflow-hidden cursor-pointer">
                        
                        <div class="w-full h-full" v-if="avatarImg">
                            <img :src="avatarImg" class="w-full h-full object-cover" alt="img">
                        </div>
                        <svg v-else-if="!avatarImg && !userMiniprofile" xmlns="http://www.w3.org/2000/svg" class="w-2/4 fill-gray-300" viewBox="0 0 448 512">
                            <path
                                d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                        </svg>
                        <div v-html="userMiniprofile" v-else class="w-full bg-gray-100"></div>

                        <div
                            class="absolute h-full w-full bg-[#00000080] z-10 group-hover:visible invisible grid place-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="fill-white w-full max-w-10"
                                viewBox="0 0 640 512" @click="() => profileImage.click()">
                                <path
                                    d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                            </svg>
                        </div>

                        <input type="file" class="hidden" name="avatar" @change="changeImg($event.target)"
                            ref="profileImage">
                    </div>

                    <div class="grid sm:grid-cols-2 gap-4 mt-6">
                        <div>
                            <Textbox id="name" label="Name" name="name" placeholder="jone deo" v-model="user.name"
                                type="text" />
                            <div class="text-red-400 mt-1 text-sm font-medium" v-if="v$.$dirty && v$.name.$invalid">
                                <span class="font-bold text-base">!</span> Name is required
                            </div>
                        </div>
                        <div>
                            <Textbox id="email" label="Email" name="email" placeholder="jonedeo@example.com"
                                v-model="user.email" type="email" />
                            <div class="text-red-400 mt-1 text-sm font-medium"
                                v-if="v$.$dirty && v$.email.required.$invalid">
                                <span class="font-bold text-base">!</span> Email is required
                            </div>
                            <div class="text-red-400 mt-1 text-sm font-medium"
                                v-if="v$.$dirty && v$.email.email.$invalid">
                                <span class="font-bold text-base">!</span> Please enter valid email address
                            </div>
                        </div>
                        <div>
                            <div class="relative">
                                <p class="block mb-2 text-sm font-medium text-gray-900">Gender</p>
                                <div class="flex items-center gap-4 mt-4">
                                    <div class="flex items-center">
                                        <label for="male" class="text-sm font-medium text-gray-900">Male</label>
                                        <input type="radio" name="gender" value="Male" id="male" class="mx-2" checked>
                                    </div>
                                    <div class="flex items-center">
                                        <label for="female" class="text-sm font-medium text-gray-900">Female</label>
                                        <input type="radio" id="female" value="Female" name="gender" class="mx-2">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Textbox id="mobile" label="Mobile No." name="mobile" placeholder="+91 00000 00000"
                                type="number" v-model="user.mobile" />
                            <div class="text-red-400 mt-1 text-sm font-medium"
                                v-if="v$.$dirty && v$.mobile.required.$invalid">
                                <span class="font-bold text-base">!</span> Mobile number is required
                            </div>
                            <div class="text-red-400 mt-1 text-sm font-medium"
                                v-if="v$.$dirty && v$.mobile.numeric.$invalid">
                                <span class="font-bold text-base">!</span> Please enter valid mobile number
                            </div>
                        </div>
                        <div>
                            <Textbox id="city" label="City" v-model="user.city" name="city" placeholder="Mumbai"
                                type="text" />
                            <div class="text-red-400 mt-1 text-sm font-medium" v-if="v$.$dirty && v$.city.$invalid">
                                <span class="font-bold text-base">!</span> City is required
                            </div>
                        </div>
                        <div>
                            <Textbox id="country" label="country" v-model="user.country" name="country"
                                placeholder="India" type="text" />
                            <div class="text-red-400 mt-1 text-sm font-medium" v-if="v$.$dirty && v$.country.$invalid">
                                <span class="font-bold text-base">!</span> Country is required
                            </div>
                        </div>
                        <input type="hidden" name="courses" :value="selectCourse.toString()">
                    </div>

                    <Btn type="submit"
                        class="mt-6 text-white flex justify-center items-center gap-2 font-medium rounded-md text-sm px-4 py-2.5 text-center"
                        :class="isLoading ? 'bg-green-300' : 'bg-success'" :disabled="isLoading">
                        Submit

                        <svg aria-hidden="true" v-if="isLoading" class="w-5 h-5 text-white animate-spin fill-success"
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

            </div>
            <div class="3lg:max-w-[396px]">
                <div class="p-4 border rounded-sm bg-white" v-if="course">
                    <h5 class="text-lg font-semibold mb-4">Course</h5>
                    <div class="flex items-center gap-3 flex-wrap">
                        <p class="px-3 py-1.5 flex items-center gap-2 rounded-[8px] font-medium lg:text-base text-[15px] cursor-pointer"
                            @click="addCourse(course)" v-for="(course, index) in course" :key="index"
                            :style="{ color: course.primary_color, backgroundColor: `${course.primary_color}1A` }">
                            <svg xmlns="http://www.w3.org/2000/svg" v-if="selectCourse.includes(course.id)"
                                class="w-full max-w-3 fill-current" viewBox="0 0 448 512">
                                <path
                                    d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                            </svg>
                            {{ course.name }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>