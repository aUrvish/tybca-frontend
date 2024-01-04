<script setup >
import { ref ,  computed } from 'vue'

const colours = ref(["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"]);

const username = ref('Mandaliya Urvish');

const nameInit = computed(() => username.value.split(" ")[0].charAt(0).toUpperCase() + username.value.split(" ")[1].charAt(0).toUpperCase())

const randColorIndex = ref(Math.floor(Math.random() * 19))

const isShowNotification = ref(false);
const isShowUserMenu = ref(false);
</script>

<template>
    <nav class="bg-white border-b border-gray-200 sm:px-4 px-2 py-1 fixed left-0 right-0 top-0 z-50">
        <div class="flex flex-wrap justify-between items-center">
            <div class="flex justify-start items-center">
                <button class="p-2 mr-2 rounded-full cursor-pointer md:hidden hover:bg-primary-100">
                    <img src="@/assets/svgs/menu.svg" class="w-6 h-6" alt="menu">
                    <img src="@/assets/svgs/close.svg" class="w-6 h-6 hidden" alt="close">
                </button>
                <RouterLink :to="{ name: 'Login' }">
                    <img src="@/assets/svgs/logo.svg" alt="Logo">
                </RouterLink>
            </div>
            <div class="flex items-center lg:order-2">
                <!-- github -->
                <a href="https://github.com/aUrvish/tybca-frontend"
                    class="p-2 mr-1 rounded-full border hover:bg-primary-100">
                    <img src="@/assets/svgs/github.svg" class="w-5 h-5" alt="github">
                </a>

                <!-- Notifications -->
                <button type="button" class="p-2 mx-1 rounded-full border hover:bg-primary-100" @click="isShowNotification =! isShowNotification" v-click-outside="() => isShowNotification = false">
                    <!-- Bell icon -->
                    <img src="../assets/svgs/bell.svg" class="w-5 h-5" alt="bell">
                </button>

                <!-- Dropdown menu -->
                <div class="overflow-hidden absolute top-full right-5 z-50 my-4 max-w-sm text-base list-none bg-white rounded-md divide-y divide-primary-100 border dark:divide-gray-600 dark:bg-gray-700" :class="isShowNotification ? '' : 'hidden'"
                    id="notification-dropdown">
                    <div
                        class="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300">
                        Notifications
                    </div>
                    <div class="border-y">
                        <a href="#" class="flex py-3 px-4 hover:bg-primary-100">
                            <div class="flex-shrink-0">
                                <img class="w-11 h-11 rounded-full"
                                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                                    alt="Bonnie Green avatar" />
                            </div>
                            <div class="pl-3 w-full">
                                <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                    New message from Bonnie Green "Hey,
                                    what's up? All set for the presentation?"
                                </div>
                                <div class="text-xs font-medium text-primary-600 dark:text-primary-500">
                                    a few moments ago
                                </div>
                            </div>
                        </a>
                    </div>
                    <a href="#"
                        class="block py-2 text-md font-medium text-center text-gray-900 bg-gray-50 hover:bg-primary-100">
                        <div class="inline-flex items-center">
                            <svg aria-hidden="true" class="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400"
                                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
                <button type="button" class="flex mx-2 text-sm rounded-full md:mr-0 w-9 h-9 justify-center items-center" :style="{ backgroundColor : colours[randColorIndex] }" v-click-outside="() => isShowUserMenu = false" @click="isShowUserMenu =! isShowUserMenu">
                    <!-- <img class="w-9 h-9 rounded-full"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                        alt="user photo" /> -->
                    <h1 class="text-white font-bold" >{{ nameInit }}</h1>
                </button>

                <!-- Dropdown menu -->
                <div class="absolute top-full right-5 z-50 my-4 w-56 text-base list-none bg-white divide-y divide-primary-100 border rounded-md" :class="isShowUserMenu ? '' : 'hidden'"
                    id="dropdown">
                    <div class="py-3 px-4">
                        <span class="block text-sm font-semibold text-gray-900 dark:text-white">Neil Sims</span>
                        <span class="block text-sm text-gray-900 truncate dark:text-white">name@flowbite.com</span>
                    </div>
                    <ul class="py-1 text-gray-700 dark:text-gray-300" aria-labelledby="dropdown">
                        <li>
                            <a href="#"
                                class="block py-2 px-4 text-sm hover:bg-primary-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">My
                                profile</a>
                        </li>
                        <li>
                            <a href="#"
                                class="block py-2 px-4 text-sm hover:bg-primary-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Account
                                settings</a>
                        </li>
                    </ul>
                    <ul class="py-1 text-gray-700 dark:text-gray-300" aria-labelledby="dropdown">
                        <li>
                            <a href="#"
                                class="flex items-center py-2 px-4 text-sm hover:bg-primary-100 dark:hover:bg-gray-600 dark:hover:text-white"><svg
                                    class="mr-2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                My likes</a>
                        </li>
                        <li>
                            <a href="#"
                                class="flex items-center py-2 px-4 text-sm hover:bg-primary-100 dark:hover:bg-gray-600 dark:hover:text-white"><svg
                                    class="mr-2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z">
                                    </path>
                                </svg>
                                Collections</a>
                        </li>
                        <li>
                            <a href="#"
                                class="flex justify-between items-center py-2 px-4 text-sm hover:bg-primary-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                <span class="flex items-center">
                                    <svg aria-hidden="true" class="mr-2 w-5 h-5 text-primary-600 dark:text-primary-500"
                                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    Pro version
                                </span>
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-400" fill="currentColor"
                                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </a>
                        </li>
                    </ul>
                    <ul class="py-1 text-gray-700 dark:text-gray-300" aria-labelledby="dropdown">
                        <li>
                            <a href="#"
                                class="block py-2 px-4 text-sm hover:bg-primary-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign
                                out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>