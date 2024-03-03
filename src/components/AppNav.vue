<script setup >
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useLoadStore } from '@/store/loading'
import { storeToRefs } from 'pinia';
import { toast } from "vue3-toastify";
import { minidenticon } from 'minidenticons'

const userMiniprofile = ref(null)

const { logoutAction, authNull } = useAuthStore();
const { changeStatusLoading } = useLoadStore();
const { auth } = storeToRefs(useAuthStore());

const props = defineProps({
    noSidebar: {
        default: true
    }
})

onMounted(
    () => {
        userMiniprofile.value = minidenticon(auth.value?.user?.name)
    }
)

// const colours = ref(["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"]);

// const username = ref('Admin');
// const isUsernameWordSingle = ref(false)

// const nameInit = computed(() => {
//     let nameArr = username.value.split(" ")
//     if (nameArr.length > 1) {
//         return nameArr[0].charAt(0).toUpperCase() + nameArr[1]?.charAt(0).toUpperCase()
//     }

//     isUsernameWordSingle.value = true
//     return username.value.charAt(0).toUpperCase()
// })

// const randColorIndex = ref(Math.floor(Math.random() * 19))

const isShowNotification = ref(false);
const isShowUserMenu = ref(false);
const isShowSidebar = ref(false);

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
    <nav class="bg-white border-b border-gray-200 sm:px-4 px-2 py-1 z-50">
        <div class="flex flex-wrap justify-between items-center">
            <div class="flex justify-start items-center">
                <button v-if="noSidebar" class="p-2 mr-2 rounded-full cursor-pointer lg:hidden hover:bg-gray-100"
                    @click="isShowSidebar = !isShowSidebar, $emit('showSidebar', isShowSidebar)"
                    v-click-outside="() => isShowSidebar = false, $emit('showSidebar', isShowSidebar)">
                    <img src="@/assets/svgs/menu.svg" class="w-6 h-6" :class="isShowSidebar ? 'hidden' : ''" alt="menu">
                    <img src="@/assets/svgs/close.svg" class="w-6 h-6" :class="isShowSidebar ? '' : 'hidden'" alt="close">
                </button>
                <RouterLink :to="{ name: 'Login' }">
                    <img src="@/assets/svgs/logo.svg" class="max-w-[120px] md:max-w-max py-1.5 md:py-0" alt="Logo">
                </RouterLink>
            </div>
            <div class="flex items-center lg:order-2">
                <!-- github -->
                <a href="https://github.com/aUrvish/tybca-frontend" class="p-2 mr-1 rounded-full border hover:bg-gray-100">
                    <img src="@/assets/svgs/github.svg" class="w-5 h-5" alt="github">
                </a>

                <!-- Notifications -->
                <button type="button" class="p-2 mx-1 rounded-full border hover:bg-gray-100 relative"
                    @click="isShowNotification = !isShowNotification" v-click-outside="() => isShowNotification = false">
                    <!-- Bell icon -->
                    <img src="../assets/svgs/bell.svg" class="w-5 h-5" alt="bell">
                    <div class="w-2 aspect-square rounded-full bg-red-500 absolute right-0"></div>
                </button>

                <!-- Dropdown menu -->
                <div class="overflow-hidden absolute top-full sm:right-5 right-1 z-50 my-4 max-w-sm text-base list-none bg-white rounded-md border"
                    :class="isShowNotification ? '' : 'hidden'" id="notification-dropdown">
                    <div class="block py-2 px-4 text-base font-medium text-center text-gray-700">
                        Notifications
                    </div>
                    <div class="border-y">
                        <a href="#" class="flex py-3 px-4 hover:bg-gray-100">
                            <div class="flex-shrink-0">
                                <img class="w-11 h-11 rounded-full"
                                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                                    alt="Bonnie Green avatar" />
                            </div>
                            <div class="pl-3 w-full">
                                <div class="text-gray-500 font-normal text-sm mb-1.5">
                                    New message from Bonnie Green "Hey,
                                    what's up? All set for the presentation?"
                                </div>
                                <div class="text-xs font-medium">
                                    a few moments ago
                                </div>
                            </div>
                        </a>
                    </div>
                    <a href="#" class="block py-2 text-md font-medium text-center text-gray-900 hover:bg-gray-100">
                        <div class="inline-flex items-center">
                            <svg aria-hidden="true" class="mr-2 w-4 h-4 text-gray-500" fill="currentColor"
                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                <path fill-rule="evenodd"
                                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            View all
                        </div>
                    </a>
                </div>

                <!-- user menu -->
                <!-- <button type="button" class="flex mx-2 text-sm rounded-full md:mr-0 w-9 h-9 justify-center items-center"
                    :style="{ backgroundColor: colours[randColorIndex] }" v-click-outside="() => isShowUserMenu = false"
                    @click="isShowUserMenu = !isShowUserMenu">
                    <h1 class="text-white" :class="isUsernameWordSingle ? 'text-xl font-normal' : 'font-bold'">{{ nameInit
                    }}</h1>
                </button> -->
                <button type="button" class="flex mx-2 text-sm rounded-full border md:mr-0 w-9 h-9 justify-center items-center"
                    v-click-outside="() => isShowUserMenu = false"
                    @click="isShowUserMenu = !isShowUserMenu">
                    <!-- <h1 class="text-white" :class="isUsernameWordSingle ? 'text-xl font-normal' : 'font-bold'">{{ nameInit
                    }}</h1> -->
                    <div class="w-full" v-html="userMiniprofile" ></div>
                </button>

                <!-- Dropdown menu -->
                <div class="absolute top-full right-5 z-50 my-4 w-56 text-base list-none bg-white divide-y border rounded-md"
                    :class="isShowUserMenu ? '' : 'hidden'" id="dropdown">
                    <div class="py-3 px-4">
                        <span class="block text-sm font-semibold text-gray-900">Neil Sims</span>
                        <span class="block text-sm text-gray-900 truncate">name@flowbite.com</span>
                    </div>
                    <ul class="py-1 text-gray-700" aria-labelledby="dropdown">
                        <li>
                            <RouterLink :to="{ name: 'Profile' }" class="block py-2 px-4 text-sm hover:bg-gray-100">My
                                profile</RouterLink>
                        </li>
                        <li>
                            <RouterLink :to="{name : 'ChangePassword'}" class="block py-2 px-4 text-sm hover:bg-gray-100">Change Password</RouterLink>
                        </li>
                    </ul>
                    <ul class="py-1 text-gray-700" aria-labelledby="dropdown">
                        <li>
                            <p @click="logout" class="block py-2 px-4 text-sm hover:bg-gray-100 cursor-pointer">Sign out</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>