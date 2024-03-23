<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/auth'
import { useLoadStore } from '@/store/loading'
import { useNoticeStore } from '@/store/notice'
const { changeStatusLoading } = useLoadStore();
const { logoutAction, authNull } = useAuthStore();
import { toast } from "vue3-toastify";
import { useRoute } from 'vue-router';
const { auth } = storeToRefs(useAuthStore());

const props = defineProps(
    {
        isShow: {
            default: false
        }
    }
)

const { latestNotice } = storeToRefs(useNoticeStore());
const route = useRoute()

const roleId = auth.value?.user.role_id;
console.log(roleId);
const availableRoute = (arr) => {
    return arr.includes(roleId)
}

const logout = () => {
    changeStatusLoading(true)
    logoutAction()
        .then(
            (res) => {
                toast(res.data.messages, {
                    "type": res.data.status ? "success" : "error",
                    "dangerouslyHTMLString": true
                })
                authNull();
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
    <aside
        class="fixed top-0 left-0 lg:z-50 z-40 w-64 h-screen lg:pt-0 pt-14 transition-transform bg-[#1a2e44] lg:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        :class="isShow ? 'translate-x-0' : '-translate-x-full'">
        <div class="space-y-2 px-4 py-2 hidden lg:block">
            <RouterLink :to="{ name: 'Login' }">
                <img src="@/assets/svgs/logo-light.svg" class="max-w-[120px] md:max-w-max py-1.5 md:py-0" alt="Logo">
            </RouterLink>
        </div>
        <div class="overflow-y-auto py-5 px-3 h-full bg-transparent dark:bg-gray-800">
            <ul class="space-y-2">
                <li>
                    <RouterLink :to="{ name: 'App' }"
                        class="flex items-center p-2 text-base font-medium text-white rounded-md hover:bg-[#38445e] group">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6 text-white group-hover:text-gray transition duration-75"
                            fill="currentColor" height="16" width="18" viewBox="0 0 576 512">
                            <path
                                d="M304 240V16.6c0-9 7-16.6 16-16.6C443.7 0 544 100.3 544 224c0 9-7.6 16-16.6 16H304zM32 272C32 150.7 122.1 50.3 239 34.3c9.2-1.3 17 6.1 17 15.4V288L412.5 444.5c6.7 6.7 6.2 17.7-1.5 23.1C371.8 495.6 323.8 512 272 512C139.5 512 32 404.6 32 272zm526.4 16c9.3 0 16.6 7.8 15.4 17c-7.7 55.9-34.6 105.6-73.9 142.3c-6 5.6-15.4 5.2-21.2-.7L320 288H558.4z" />
                        </svg>
                        <span class="ml-3.5 group-hover:text-gray">Overview</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink :to="{ name: 'Profile' }" :class="['ProfileEdit'].includes(route.name) ? 'router-link-exact-active' : ''"
                        class="flex items-center p-2 text-base font-medium text-white rounded-md hover:bg-[#38445e] group">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                            class="w-6 text-white group-hover:text-gray transition duration-75" fill="currentColor">
                            <path
                                d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 256h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zm256-32H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                        </svg>
                        <span class="ml-3.5 group-hover:text-gray">Profile</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink :to="{ name: 'noticeList' }" :class="['noticeEdit'].includes(route.name) ? 'router-link-exact-active' : ''"
                        class="flex items-center p-2 text-base font-medium text-white rounded-md hover:bg-[#38445e] group">

                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16"
                            class="w-5 h-5 text-white group-hover:text-gray transition duration-75"
                            fill="currentColor" viewBox="0 0 512 512">
                            <path
                                d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
                        </svg>
                        <span class="ml-3.5 group-hover:text-gray">Notice</span>
                        <span class="text-sm bg-red-500 px-2 text-white rounded-full ml-auto" v-if="latestNotice.length">{{ latestNotice.length }}</span>
                    </RouterLink>
                </li>
            </ul>
            <ul class="space-y-2 mt-2 border-t border-[#38445e] pt-2" v-if="availableRoute([2])">
                <li>
                    <RouterLink :to="{ name: 'testList' }" 
                        class="flex items-center p-2 text-base font-medium text-white rounded-md hover:bg-[#38445e] group">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 text-white group-hover:text-gray transition duration-75"
                            fill="currentColor" height="16" width="16" viewBox="0 0 512 512">
                            <path
                                d="M368.4 18.3L312.7 74.1 437.9 199.3l55.7-55.7c21.9-21.9 21.9-57.3 0-79.2L447.6 18.3c-21.9-21.9-57.3-21.9-79.2 0zM288 94.6l-9.2 2.8L134.7 140.6c-19.9 6-35.7 21.2-42.3 41L3.8 445.8c-3.8 11.3-1 23.9 7.3 32.4L164.7 324.7c-3-6.3-4.7-13.3-4.7-20.7c0-26.5 21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48c-7.4 0-14.4-1.7-20.7-4.7L33.7 500.9c8.6 8.3 21.1 11.2 32.4 7.3l264.3-88.6c19.7-6.6 35-22.4 41-42.3l43.2-144.1 2.8-9.2L288 94.6z" />
                        </svg>
                        <span class="ml-3.5 group-hover:text-gray">Test</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink :to="{ name: 'Certificate' }"
                        class="flex items-center p-2 text-base font-medium text-white rounded-md hover:bg-[#38445e] group">

                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 text-white group-hover:text-gray transition duration-75"
                            fill="currentColor" viewBox="0 0 512 512">
                            <path
                                d="M211 7.3C205 1 196-1.4 187.6 .8s-14.9 8.9-17.1 17.3L154.7 80.6l-62-17.5c-8.4-2.4-17.4 0-23.5 6.1s-8.5 15.1-6.1 23.5l17.5 62L18.1 170.6c-8.4 2.1-15 8.7-17.3 17.1S1 205 7.3 211l46.2 45L7.3 301C1 307-1.4 316 .8 324.4s8.9 14.9 17.3 17.1l62.5 15.8-17.5 62c-2.4 8.4 0 17.4 6.1 23.5s15.1 8.5 23.5 6.1l62-17.5 15.8 62.5c2.1 8.4 8.7 15 17.1 17.3s17.3-.2 23.4-6.4l45-46.2 45 46.2c6.1 6.2 15 8.7 23.4 6.4s14.9-8.9 17.1-17.3l15.8-62.5 62 17.5c8.4 2.4 17.4 0 23.5-6.1s8.5-15.1 6.1-23.5l-17.5-62 62.5-15.8c8.4-2.1 15-8.7 17.3-17.1s-.2-17.4-6.4-23.4l-46.2-45 46.2-45c6.2-6.1 8.7-15 6.4-23.4s-8.9-14.9-17.3-17.1l-62.5-15.8 17.5-62c2.4-8.4 0-17.4-6.1-23.5s-15.1-8.5-23.5-6.1l-62 17.5L341.4 18.1c-2.1-8.4-8.7-15-17.1-17.3S307 1 301 7.3L256 53.5 211 7.3z" />
                        </svg>
                        <span class="ml-3.5 group-hover:text-gray">certificate</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink :to="{ name: 'Result' }"
                        class="flex items-center p-2 text-base font-medium text-white rounded-md hover:bg-[#38445e] group">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                            class="w-5 h-5 text-white group-hover:text-gray transition duration-75"
                            fill="currentColor">
                            <path
                                d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm64 192c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm64-64c0-17.7 14.3-32 32-32s32 14.3 32 32V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V160zM320 288c17.7 0 32 14.3 32 32v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V320c0-17.7 14.3-32 32-32z" />
                        </svg>
                        <span class="ml-3.5 group-hover:text-gray">Result</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink :to="{ name: 'UserTeacherList' }" :class="['TeacherAdd'].includes(route.name) ? 'router-link-exact-active' : ''"
                        class="flex items-center p-2 text-base font-medium text-white rounded-md hover:bg-[#38445e] group">

                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20"
                            class="w-5 h-5 text-white group-hover:text-gray transition duration-75"
                            fill="currentColor" viewBox="0 0 448 512">
                            <path
                                d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7H162.5c0 0 0 0 .1 0H168 280h5.5c0 0 0 0 .1 0H417.3c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2H224 204.3c-12.4 0-20.1 13.6-13.7 24.2z" />
                        </svg>
                        <span class="ml-3.5 group-hover:text-gray">Teachers</span>
                    </RouterLink>
                </li>
            </ul>
            <ul class="space-y-2 mt-2 border-t border-[#38445e] pt-2" v-if="availableRoute([0, 1])">
                <li>
                    <RouterLink :to="{ name: 'StudentList' }" :class="['StudentAdd'].includes(route.name) ? 'router-link-exact-active' : ''"
                        class="flex items-center p-2 text-base font-medium text-white rounded-md hover:bg-[#38445e] group">

                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20"
                            class="w-6 h-6 text-white group-hover:text-gray transition duration-75"
                            fill="currentColor" viewBox="0 0 640 512">
                            <path
                                d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9v28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5V291.9c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z" />
                        </svg>
                        <span class="ml-3.5 group-hover:text-gray">Students</span>
                    </RouterLink>
                </li>
                <li v-if="availableRoute([0])">
                    <RouterLink :to="{ name: 'TeacherList' }"
                        class="flex items-center p-2 text-base font-medium text-white rounded-md hover:bg-[#38445e] group">

                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20"
                            class="w-5 h-5 text-white group-hover:text-gray transition duration-75"
                            fill="currentColor" viewBox="0 0 448 512">
                            <path
                                d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7H162.5c0 0 0 0 .1 0H168 280h5.5c0 0 0 0 .1 0H417.3c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2H224 204.3c-12.4 0-20.1 13.6-13.7 24.2z" />
                        </svg>
                        <span class="ml-3.5 group-hover:text-gray">Teachers</span>
                    </RouterLink>
                </li>
                <li v-if="availableRoute([1])">
                    <RouterLink :to="{ name: 'UserTeacherList' }" :class="['TeacherAdd'].includes(route.name) ? 'router-link-exact-active' : ''"
                        class="flex items-center p-2 text-base font-medium text-white rounded-md hover:bg-[#38445e] group">

                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20"
                            class="w-5 h-5 text-white group-hover:text-gray transition duration-75"
                            fill="currentColor" viewBox="0 0 448 512">
                            <path
                                d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7H162.5c0 0 0 0 .1 0H168 280h5.5c0 0 0 0 .1 0H417.3c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2H224 204.3c-12.4 0-20.1 13.6-13.7 24.2z" />
                        </svg>
                        <span class="ml-3.5 group-hover:text-gray">Staff</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink :to="{ name: 'QuizList' }"
                        class="flex items-center p-2 text-base font-medium text-white rounded-md hover:bg-[#38445e] group">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 text-white group-hover:text-gray transition duration-75"
                            fill="currentColor" height="16" width="16" viewBox="0 0 512 512">
                            <path
                                d="M368.4 18.3L312.7 74.1 437.9 199.3l55.7-55.7c21.9-21.9 21.9-57.3 0-79.2L447.6 18.3c-21.9-21.9-57.3-21.9-79.2 0zM288 94.6l-9.2 2.8L134.7 140.6c-19.9 6-35.7 21.2-42.3 41L3.8 445.8c-3.8 11.3-1 23.9 7.3 32.4L164.7 324.7c-3-6.3-4.7-13.3-4.7-20.7c0-26.5 21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48c-7.4 0-14.4-1.7-20.7-4.7L33.7 500.9c8.6 8.3 21.1 11.2 32.4 7.3l264.3-88.6c19.7-6.6 35-22.4 41-42.3l43.2-144.1 2.8-9.2L288 94.6z" />
                        </svg>
                        <span class="ml-3.5 group-hover:text-gray">Quiz</span>
                    </RouterLink>
                </li>
                <!-- <li v-if="availableRoute([0])">
                    <RouterLink :to="{ name: 'Payment' }"
                        class="flex items-center p-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100 group">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 text-gray-500 group-hover:text-gray transition duration-75" fill="currentColor"
                            height="16" width="18" viewBox="0 0 576 512">
                            <path
                                d="M64 32C28.7 32 0 60.7 0 96v32H576V96c0-35.3-28.7-64-64-64H64zM576 224H0V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V224zM112 352h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16H368c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16z" />
                        </svg>
                        <span class="ml-3.5 group-hover:text-gray">payment</span>
                    </RouterLink>
                </li> -->
            </ul>

        </div>
        <!-- <div class="absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex hidden bg-transparent z-20">
            <ul class="w-full">
                <li>
                    <a href="#" @click="logout"
                        class="py-2 px-4 text-base font-medium text-gray-900 rounded-lg transition duration-75 group flex justify-between items-center bg-red-200">
                        <span class="text-red-600 text-sm">Logout</span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" class="fill-red-600"
                            viewBox="0 0 512 512">
                            <path
                                d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z" />
                        </svg>
                    </a>
                </li>
            </ul>
        </div> -->
    </aside>
</template>

<style scoped>
.router-link-exact-active {
    @apply bg-[#38445e] text-white border-l-[3px] border-blue
}

.router-link-exact-active svg {
    @apply fill-white
}
</style>