<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useLoadStore } from '@/store/loading'
import { minidenticon } from 'minidenticons'
import { storeToRefs } from 'pinia';
import { toast } from "vue3-toastify";

import { useNoticeStore } from '@/store/notice'
import services from '@/plugins/service'

const { noticeGetAllPublishAction,  setLatestNotice, setLastCheckout, setClearLatestNotice } = useNoticeStore();

const userMiniprofile = ref(null)

const { logoutAction, authNull } = useAuthStore();
const { changeStatusLoading } = useLoadStore();
const { auth } = storeToRefs(useAuthStore());
const { lastCheckout, latestNotice } = storeToRefs(useNoticeStore());
const getStorage = services.storageBaseUrl;

const props = defineProps({
    noSidebar: {
        default: true
    }
})

onMounted(
    () => {
        userMiniprofile.value = minidenticon(auth.value?.user?.name)
        fetchLetast()
    }
)

const isShowNotification = ref(false);
const isShowUserMenu = ref(false);
const isShowSidebar = ref(false);
const router = useRouter()

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

// notice brodcast event

import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
import { useRouter } from 'vue-router';
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'ABCDEFG',
    cluster: 'mt1',
    wsHost: '127.0.0.1',
    wsPort: 6001,
    wssPort: 6001,
    forceTLS: false,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
});

const miniavtar = (name) => {
    return minidenticon(name)
}

const fetchLetast = () => {
    changeStatusLoading(true)
    noticeGetAllPublishAction()
        .then(
            (res) => {
                if (res.data.data) {
                    let data = res.data.data
                    if (lastCheckout.value) {
                        let latastData = data.filter((curr) => 
                        new Date(curr.updated_at) > new Date(lastCheckout.value) && curr.user.role_id != auth.value.user.role_id)
                        setLatestNotice(latastData)
                    }else{
                        setLastCheckout(data[0].updated_at)
                        setLatestNotice(data)
                    }
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
}

window.Echo.channel('notice-publish').listen('NoticePublish', () => fetchLetast());
</script>

<template>
    <nav class="bg-white border-b border-gray-200 sm:px-4 px-2 py-1 z-50">
        <div class="flex flex-wrap justify-between items-center">
            <div class="flex justify-start items-center">
                <button v-if="noSidebar" class="p-2 mr-2 rounded-full cursor-pointer lg:hidden hover:bg-gray-100"
                    @click="isShowSidebar = !isShowSidebar, $emit('showSidebar', isShowSidebar)"
                    v-click-outside="() => isShowSidebar = false, $emit('showSidebar', isShowSidebar)">
                    <img src="@/assets/svgs/menu.svg" class="w-6 h-6" :class="isShowSidebar ? 'hidden' : ''" alt="menu">
                    <img src="@/assets/svgs/close.svg" class="w-6 h-6" :class="isShowSidebar ? '' : 'hidden'"
                        alt="close">
                </button>
                <RouterLink :to="{ name: 'Login' }">
                    <img src="@/assets/svgs/logo.svg" class="max-w-[120px] md:max-w-max py-1.5 md:py-0" alt="Logo">
                </RouterLink>
            </div>
            <div class="flex items-center lg:order-2">
                <!-- github -->
                <a href="https://github.com/aUrvish/tybca-frontend"
                    class="p-2 mr-1 rounded-full border hover:bg-gray-100">
                    <img src="@/assets/svgs/github.svg" class="w-5 h-5" alt="github">
                </a>

                <!-- Notifications -->
                <button type="button" class="p-2 mx-1 rounded-full border hover:bg-gray-100 relative"
                    @click="latestNotice.length ? isShowNotification = !isShowNotification : router.push('/notice')"
                    v-click-outside="() => isShowNotification = false">
                    <!-- Bell icon -->
                    <img src="../assets/svgs/bell.svg" class="w-5 h-5" alt="bell">
                    <div class="w-2 aspect-square rounded-full bg-red-500 absolute right-0" v-if="latestNotice.length"></div>
                </button>

                <!-- Dropdown menu -->
                <div class="overflow-hidden absolute top-full sm:right-5 right-1 z-50 my-4 max-w-sm text-base list-none bg-white rounded-md border"
                    :class="isShowNotification ? '' : 'hidden'" id="notification-dropdown">
                    <div class="block py-2 px-4 text-base font-medium text-center text-gray-700">
                        Notifications
                    </div>
                    <div class="border-y">
                        <a href="#" class="flex py-3 px-4 hover:bg-gray-100" v-for="(notice , index) in latestNotice" :key="index">
                            <div class="flex-shrink-0">
                                    <div class="w-11 h-11 rounded-full overflow-hidden" >
                                        <img :src="getStorage + notice.user.avatar" class="object-cover w-full h-full" v-if="notice.user.avatar" alt="avtar">
                                        <div v-html="miniavtar(notice.user.name)" v-else class="w-full bg-white"></div>
                                    </div>
                            </div>
                            <div class="pl-3 w-full">
                                <div class="text-gray-500 font-normal text-sm mb-1.5">
                                    New message from {{ notice.user.name }} "{{ notice.title }}"
                                </div>
                                <div class="text-xs font-medium">
                                    {{ new Date(notice.updated_at).toLocaleString() }}
                                </div>
                            </div>
                        </a>
                    </div>
                    <a href="#" @click="router.push('/notice')" class="block py-2 text-md font-medium text-center text-gray-900 hover:bg-gray-100">
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
                <button type="button"
                    class="flex mx-2 text-sm rounded-full border md:mr-0 w-9 h-9 justify-center items-center overflow-hidden"
                    v-click-outside="() => isShowUserMenu = false" @click="isShowUserMenu = !isShowUserMenu">
                    <!-- <h1 class="text-white" :class="isUsernameWordSingle ? 'text-xl font-normal' : 'font-bold'">{{ nameInit
                    }}</h1> -->
                    <img :src="getStorage + auth.user.avatar" class="w-full h-full object-cover" v-if="auth.user.avatar"
                        alt="avtar">
                    <div class="w-full" v-html="userMiniprofile"></div>
                </button>

                <!-- Dropdown menu -->
                <div class="absolute top-full right-5 z-50 my-4 w-56 text-base list-none bg-white divide-y border rounded-md"
                    :class="isShowUserMenu ? '' : 'hidden'" id="dropdown">
                    <div class="py-3 px-4">
                        <p class="block text-sm font-semibold text-gray-900">{{ auth.user.name }}</p>
                        <p class="block text-sm text-gray-900 truncate">{{ auth.user.email }}</p>
                    </div>
                    <ul class="py-1 text-gray-700" aria-labelledby="dropdown">
                        <li>
                            <RouterLink :to="{ name: 'Profile' }" class="block py-2 px-4 text-sm hover:bg-gray-100">My
                                profile</RouterLink>
                        </li>
                        <li>
                            <RouterLink :to="{ name: 'ChangePassword' }"
                                class="block py-2 px-4 text-sm hover:bg-gray-100">Change Password</RouterLink>
                        </li>
                    </ul>
                    <ul class="py-1 text-gray-700" aria-labelledby="dropdown">
                        <li>
                            <p @click="logout" class="block py-2 px-4 text-sm hover:bg-gray-100 cursor-pointer">Sign out
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>